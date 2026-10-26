ALTER TABLE scenarios
ADD CONSTRAINT scenarios_id_project_unique UNIQUE (id, project_id);
