from sqlalchemy import select
from sqlalchemy.orm import Session

from models import BacklogItem, Dialog, Message, Project, Scenario
from schemas import (
    BacklogItemCreate,
    BacklogItemUpdate,
    DialogCreate,
    DialogUpdate,
    MessageCreate,
    MessageUpdate,
    ProjectCreate,
    ProjectUpdate,
    ScenarioCreate,
    ScenarioUpdate,
)
from services import validate_dialog, validate_message


def get_projects(db: Session):
    return db.scalars(select(Project).order_by(Project.id)).all()


def get_project(db: Session, project_id: int):
    return db.get(Project, project_id)


def create_project(db: Session, data: ProjectCreate):
    project = Project(name=data.name, description=data.description)
    db.add(project)
    db.commit()
    db.refresh(project)
    return project


def update_project(db: Session, project: Project, data: ProjectUpdate):
    project.name = data.name
    project.description = data.description
    db.commit()
    db.refresh(project)
    return project


def delete_project(db: Session, project: Project):
    db.delete(project)
    db.commit()


def get_scenarios(db: Session, project_id: int):
    statement = (
        select(Scenario)
        .where(Scenario.project_id == project_id)
        .order_by(Scenario.id)
    )
    return db.scalars(statement).all()


def get_scenario(db: Session, project_id: int, scenario_id: int):
    statement = select(Scenario).where(
        Scenario.id == scenario_id, Scenario.project_id == project_id
    )
    return db.scalar(statement)


def create_scenario(db: Session, project_id: int, data: ScenarioCreate):
    scenario = Scenario(
        project_id=project_id, name=data.name, description=data.description
    )
    db.add(scenario)
    db.commit()
    db.refresh(scenario)
    return scenario


def update_scenario(db: Session, scenario: Scenario, data: ScenarioUpdate):
    scenario.name = data.name
    scenario.description = data.description
    db.commit()
    db.refresh(scenario)
    return scenario


def delete_scenario(db: Session, scenario: Scenario):
    db.delete(scenario)
    db.commit()


def get_dialogs(db: Session, project_id: int):
    statement = (
        select(Dialog).where(Dialog.project_id == project_id).order_by(Dialog.id)
    )
    return db.scalars(statement).all()


def get_dialog(db: Session, project_id: int, dialog_id: int, lock: bool = False):
    statement = select(Dialog).where(
        Dialog.id == dialog_id, Dialog.project_id == project_id
    )
    if lock:
        statement = statement.with_for_update()
    return db.scalar(statement)


def create_dialog(db: Session, project_id: int, data: DialogCreate):
    validate_dialog(db, project_id, data)
    dialog = Dialog(
        project_id=project_id,
        scenario_id=data.scenario_id,
        external_id=data.external_id,
        started_at=data.started_at,
        ended_at=data.ended_at,
        status=data.status,
    )
    db.add(dialog)
    db.commit()
    db.refresh(dialog)
    return dialog


def update_dialog(db: Session, dialog: Dialog, data: DialogUpdate):
    db.refresh(dialog, with_for_update=True)
    validate_dialog(db, dialog.project_id, data, dialog.id)
    dialog.scenario_id = data.scenario_id
    dialog.external_id = data.external_id
    dialog.started_at = data.started_at
    dialog.ended_at = data.ended_at
    dialog.status = data.status
    db.commit()
    db.refresh(dialog)
    return dialog


def delete_dialog(db: Session, dialog: Dialog):
    db.delete(dialog)
    db.commit()


def get_messages(db: Session, dialog_id: int):
    statement = (
        select(Message)
        .where(Message.dialog_id == dialog_id)
        .order_by(Message.position)
    )
    return db.scalars(statement).all()


def get_message(db: Session, dialog_id: int, message_id: int):
    statement = select(Message).where(
        Message.id == message_id, Message.dialog_id == dialog_id
    )
    return db.scalar(statement)


def create_message(db: Session, dialog: Dialog, data: MessageCreate):
    validate_message(dialog, data)
    message = Message(
        dialog_id=dialog.id,
        position=data.position,
        role=data.role,
        text=data.text,
        sent_at=data.sent_at,
        intent=data.intent,
        confidence=data.confidence,
        is_fallback=data.is_fallback,
    )
    db.add(message)
    db.commit()
    db.refresh(message)
    return message


def update_message(db: Session, dialog: Dialog, message: Message, data: MessageUpdate):
    validate_message(dialog, data)
    message.position = data.position
    message.role = data.role
    message.text = data.text
    message.sent_at = data.sent_at
    message.intent = data.intent
    message.confidence = data.confidence
    message.is_fallback = data.is_fallback
    db.commit()
    db.refresh(message)
    return message


def delete_message(db: Session, message: Message):
    db.delete(message)
    db.commit()


def get_backlog_items(db: Session, project_id: int):
    statement = (
        select(BacklogItem)
        .where(BacklogItem.project_id == project_id)
        .order_by(BacklogItem.id)
    )
    return db.scalars(statement).all()


def get_backlog_item(db: Session, project_id: int, item_id: int):
    statement = select(BacklogItem).where(
        BacklogItem.id == item_id, BacklogItem.project_id == project_id
    )
    return db.scalar(statement)


def create_backlog_item(db: Session, project_id: int, data: BacklogItemCreate):
    item = BacklogItem(
        project_id=project_id,
        title=data.title,
        description=data.description,
        priority=data.priority,
        status=data.status,
        source=data.source,
    )
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


def update_backlog_item(db: Session, item: BacklogItem, data: BacklogItemUpdate):
    item.title = data.title
    item.description = data.description
    item.priority = data.priority
    item.status = data.status
    item.source = data.source
    db.commit()
    db.refresh(item)
    return item


def delete_backlog_item(db: Session, item: BacklogItem):
    db.delete(item)
    db.commit()
