from datetime import datetime
from typing import Literal

from pydantic import AwareDatetime, BaseModel, ConfigDict, Field, model_validator


class ProjectCreate(BaseModel):
    model_config = ConfigDict(extra="forbid")

    name: str = Field(min_length=1, max_length=100, pattern=r"\S")
    description: str = ""


class ProjectUpdate(ProjectCreate):
    pass


class ProjectRead(ProjectCreate):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime


class ScenarioCreate(BaseModel):
    model_config = ConfigDict(extra="forbid")

    name: str = Field(min_length=1, max_length=150, pattern=r"\S")
    description: str = ""


class ScenarioUpdate(ScenarioCreate):
    pass


class ScenarioRead(ScenarioCreate):
    model_config = ConfigDict(from_attributes=True)

    id: int
    project_id: int


class DialogCreate(BaseModel):
    model_config = ConfigDict(extra="forbid")

    scenario_id: int | None = Field(default=None, gt=0, le=2_147_483_647, strict=True)
    external_id: str | None = Field(default=None, max_length=255)
    started_at: AwareDatetime
    ended_at: AwareDatetime | None = None
    status: Literal["completed", "abandoned", "fallback", "operator"]

    @model_validator(mode="after")
    def validate_dates(self):
        if self.ended_at is not None and self.ended_at < self.started_at:
            raise ValueError("ended_at must not be earlier than started_at")
        return self


class DialogUpdate(DialogCreate):
    pass


class DialogRead(DialogCreate):
    model_config = ConfigDict(from_attributes=True)

    id: int
    project_id: int


class MessageCreate(BaseModel):
    model_config = ConfigDict(extra="forbid")

    position: int = Field(gt=0, le=2_147_483_647, strict=True)
    role: Literal["user", "bot", "operator"]
    text: str = Field(min_length=1, pattern=r"\S")
    sent_at: AwareDatetime
    intent: str | None = Field(default=None, max_length=150)
    confidence: float | None = Field(
        default=None, ge=0, le=1, allow_inf_nan=False, strict=True
    )
    is_fallback: bool = Field(default=False, strict=True)

    @model_validator(mode="after")
    def validate_analysis(self):
        if self.role != "user" and (
            self.intent is not None or self.confidence is not None or self.is_fallback
        ):
            raise ValueError("Only user messages can have intent, confidence or fallback")
        return self


class MessageUpdate(MessageCreate):
    pass


class MessageRead(MessageCreate):
    model_config = ConfigDict(from_attributes=True)

    id: int
    dialog_id: int


class BacklogItemCreate(BaseModel):
    model_config = ConfigDict(extra="forbid")

    title: str = Field(min_length=1, max_length=200, pattern=r"\S")
    description: str = ""
    priority: Literal["low", "medium", "high"] = "medium"
    status: Literal["open", "in_progress", "done"] = "open"
    source: Literal["requests", "fallbacks", "scenarios", "manual"] = "manual"


class BacklogItemUpdate(BacklogItemCreate):
    pass


class BacklogItemRead(BacklogItemCreate):
    model_config = ConfigDict(from_attributes=True)

    id: int
    project_id: int
    created_at: datetime
