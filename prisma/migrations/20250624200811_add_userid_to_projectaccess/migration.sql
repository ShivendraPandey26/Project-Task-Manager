-- DropIndex
DROP INDEX "Project_workspaceId_key";

-- CreateIndex
CREATE INDEX "Project_workspaceId_idx" ON "Project"("workspaceId");
