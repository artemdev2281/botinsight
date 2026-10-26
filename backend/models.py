from sqlalchemy import (
    Boolean,
    CheckConstraint,
    Column,
    DateTime,
    Float,
    ForeignKey,
    ForeignKeyConstraint,
    Integer,
    String,
    Text,
    UniqueConstraint,
    false,
    func,
)
from sqlalchemy.orm import DeclarativeBase, relationship


class Base(DeclarativeBase):
    pass


class Project(Base):
    __tablename__ = "projects"
    __table_args__ = (
        CheckConstraint(r"name ~ '\S'", name="projects_name_not_blank"),
    )

    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    description = Column(Text, nullable=False, server_default="")
    created_at = Column(
        DateTime(timezone=True), nullable=False, server_default=func.now()
    )

    scenarios = relationship(
        "Scenario",
        back_populates="project",
        cascade="all, delete-orphan",
        passive_deletes=True,
    )
    dialogs = relationship(
        "Dialog",
        back_populates="project",
        cascade="all, delete-orphan",
        passive_deletes=True,
    )
    backlog_items = relationship(
        "BacklogItem",
        back_populates="project",
        cascade="all, delete-orphan",
        passive_deletes=True,
    )


class Scenario(Base):
    __tablename__ = "scenarios"
    __table_args__ = (
        CheckConstraint(r"name ~ '\S'", name="scenarios_name_not_blank"),
        UniqueConstraint("project_id", "name", name="scenarios_project_name_unique"),
        UniqueConstraint("id", "project_id", name="scenarios_id_project_unique"),
    )

    id = Column(Integer, primary_key=True)
    project_id = Column(
        Integer, ForeignKey("projects.id", ondelete="CASCADE"), nullable=False
    )
    name = Column(String(150), nullable=False)
    description = Column(Text, nullable=False, server_default="")

    project = relationship("Project", back_populates="scenarios")
    dialogs = relationship(
        "Dialog",
        back_populates="scenario",
        foreign_keys="Dialog.scenario_id",
        passive_deletes=True,
    )


class Dialog(Base):
    __tablename__ = "dialogs"
    __table_args__ = (
        ForeignKeyConstraint(
            ["scenario_id", "project_id"],
            ["scenarios.id", "scenarios.project_id"],
            name="dialogs_scenario_project_fk",
            ondelete="SET NULL (scenario_id)",
        ),
        UniqueConstraint(
            "project_id", "external_id", name="dialogs_project_external_id_unique"
        ),
        CheckConstraint(
            "ended_at IS NULL OR ended_at >= started_at",
            name="dialogs_valid_dates",
        ),
        CheckConstraint(
            "status IN ('completed', 'abandoned', 'fallback', 'operator')",
            name="dialogs_valid_status",
        ),
    )

    id = Column(Integer, primary_key=True)
    project_id = Column(
        Integer, ForeignKey("projects.id", ondelete="CASCADE"), nullable=False
    )
    scenario_id = Column(Integer, nullable=True, index=True)
    external_id = Column(String(255), nullable=True)
    started_at = Column(DateTime(timezone=True), nullable=False)
    ended_at = Column(DateTime(timezone=True), nullable=True)
    status = Column(String(20), nullable=False)

    project = relationship("Project", back_populates="dialogs")
    scenario = relationship(
        "Scenario", back_populates="dialogs", foreign_keys=[scenario_id]
    )
    messages = relationship(
        "Message",
        back_populates="dialog",
        order_by="Message.position",
        cascade="all, delete-orphan",
        passive_deletes=True,
    )


class Message(Base):
    __tablename__ = "messages"
    __table_args__ = (
        UniqueConstraint(
            "dialog_id", "position", name="messages_dialog_position_unique"
        ),
        CheckConstraint("position > 0", name="messages_positive_position"),
        CheckConstraint(
            "role IN ('user', 'bot', 'operator')", name="messages_valid_role"
        ),
        CheckConstraint(r"text ~ '\S'", name="messages_text_not_blank"),
        CheckConstraint(
            "confidence IS NULL OR (confidence >= 0 AND confidence <= 1)",
            name="messages_valid_confidence",
        ),
        CheckConstraint(
            "role = 'user' OR "
            "(intent IS NULL AND confidence IS NULL AND is_fallback = false)",
            name="messages_user_analysis_only",
        ),
    )

    id = Column(Integer, primary_key=True)
    dialog_id = Column(
        Integer, ForeignKey("dialogs.id", ondelete="CASCADE"), nullable=False
    )
    position = Column(Integer, nullable=False)
    role = Column(String(20), nullable=False)
    text = Column(Text, nullable=False)
    sent_at = Column(DateTime(timezone=True), nullable=False)
    intent = Column(String(150), nullable=True)
    confidence = Column(Float, nullable=True)
    is_fallback = Column(Boolean, nullable=False, server_default=false())

    dialog = relationship("Dialog", back_populates="messages")


class BacklogItem(Base):
    __tablename__ = "backlog_items"
    __table_args__ = (
        CheckConstraint(r"title ~ '\S'", name="backlog_items_title_not_blank"),
        CheckConstraint(
            "priority IN ('low', 'medium', 'high')",
            name="backlog_items_valid_priority",
        ),
        CheckConstraint(
            "status IN ('open', 'in_progress', 'done')",
            name="backlog_items_valid_status",
        ),
        CheckConstraint(
            "source IN ('requests', 'fallbacks', 'scenarios', 'manual')",
            name="backlog_items_valid_source",
        ),
    )

    id = Column(Integer, primary_key=True)
    project_id = Column(
        Integer, ForeignKey("projects.id", ondelete="CASCADE"), nullable=False, index=True
    )
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=False, server_default="")
    priority = Column(String(20), nullable=False, server_default="medium")
    status = Column(String(20), nullable=False, server_default="open")
    source = Column(String(20), nullable=False, server_default="manual")
    created_at = Column(
        DateTime(timezone=True), nullable=False, server_default=func.now()
    )

    project = relationship("Project", back_populates="backlog_items")
