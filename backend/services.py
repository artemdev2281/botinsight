from sqlalchemy import func, select
from sqlalchemy.orm import Session

from models import Dialog, Message, Scenario
from schemas import DialogCreate, MessageCreate


class BusinessError(Exception):
    pass


def validate_dialog(
    db: Session, project_id: int, data: DialogCreate, dialog_id: int | None = None
):
    if data.scenario_id is not None:
        scenario = db.get(Scenario, data.scenario_id)
        if scenario is None or scenario.project_id != project_id:
            raise BusinessError("Scenario does not exist in this project")

    if dialog_id is None:
        return

    statement = select(func.min(Message.sent_at), func.max(Message.sent_at)).where(
        Message.dialog_id == dialog_id
    )
    first_message_at, last_message_at = db.execute(statement).one()
    if first_message_at is not None and first_message_at < data.started_at:
        raise BusinessError("started_at must not be later than existing messages")
    if (
        data.ended_at is not None
        and last_message_at is not None
        and last_message_at > data.ended_at
    ):
        raise BusinessError("ended_at must not be earlier than existing messages")


def validate_message(dialog: Dialog, data: MessageCreate):
    if data.sent_at < dialog.started_at:
        raise BusinessError("sent_at must not be earlier than dialog started_at")
    if dialog.ended_at is not None and data.sent_at > dialog.ended_at:
        raise BusinessError("sent_at must not be later than dialog ended_at")
