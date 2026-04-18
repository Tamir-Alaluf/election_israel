-- CreateTable
CREATE TABLE "parties" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "candidate_id" UUID,
    "color" TEXT,
    "mandates" INTEGER,
    "vision" TEXT,
    "imageUrl" TEXT,

    CONSTRAINT "parties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "candidates" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "party_id" UUID NOT NULL,
    "image_url" TEXT,
    "professional_background" TEXT,
    "vision" TEXT,

    CONSTRAINT "candidates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "party_members" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "party_id" UUID NOT NULL,
    "order_index" INTEGER NOT NULL,
    "image_url" TEXT,

    CONSTRAINT "party_members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "base_topics" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "base_topics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "base_topic_options" (
    "id" UUID NOT NULL,
    "base_topic_id" UUID NOT NULL,
    "option_display_value" TEXT NOT NULL,

    CONSTRAINT "base_topic_options_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "party_base_topics" (
    "id" UUID NOT NULL,
    "party_id" UUID NOT NULL,
    "base_topic_id" UUID NOT NULL,
    "base_topic_option_id" UUID NOT NULL,
    "description" TEXT,

    CONSTRAINT "party_base_topics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "legislation_groups" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "legislation_groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "legislations" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "legislation_group_id" UUID NOT NULL,

    CONSTRAINT "legislations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "legislation_options" (
    "id" UUID NOT NULL,
    "display_value" TEXT NOT NULL,

    CONSTRAINT "legislation_options_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "party_legislations" (
    "id" UUID NOT NULL,
    "party_id" UUID NOT NULL,
    "legislation_id" UUID NOT NULL,
    "option_id" UUID NOT NULL,

    CONSTRAINT "party_legislations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "action_groups" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "action_groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recent_actions" (
    "id" UUID NOT NULL,
    "party_id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "action_group_id" UUID NOT NULL,
    "description" TEXT,
    "order_index" INTEGER,

    CONSTRAINT "recent_actions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "future_promises" (
    "id" UUID NOT NULL,
    "party_id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "action_group_id" UUID NOT NULL,
    "description" TEXT,
    "order_index" INTEGER,

    CONSTRAINT "future_promises_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "candidate_educations" (
    "id" UUID NOT NULL,
    "candidate_id" UUID NOT NULL,
    "major" TEXT,
    "start_year" INTEGER,
    "end_year" INTEGER,
    "degree_level" TEXT,
    "university" TEXT,
    "description" TEXT,

    CONSTRAINT "candidate_educations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "professional_groups" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "professional_groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "candidate_professionals" (
    "id" UUID NOT NULL,
    "candidate_id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "start_year" INTEGER,
    "end_year" INTEGER,
    "description" TEXT,
    "group_id" UUID NOT NULL,

    CONSTRAINT "candidate_professionals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "candidate_career_actions" (
    "id" UUID NOT NULL,
    "candidate_id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "action_group_id" UUID NOT NULL,
    "description" TEXT,
    "order_index" INTEGER,

    CONSTRAINT "candidate_career_actions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "candidate_recent_actions" (
    "id" UUID NOT NULL,
    "candidate_id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "action_group_id" UUID NOT NULL,
    "description" TEXT,
    "order_index" INTEGER,

    CONSTRAINT "candidate_recent_actions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public_opinions" (
    "id" UUID NOT NULL,
    "candidate_id" UUID NOT NULL,
    "sentiment" TEXT NOT NULL,
    "description" TEXT,
    "order_index" INTEGER,

    CONSTRAINT "public_opinions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "glossary_categories" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "glossary_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "glossary_terms" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "glossary_category_id" UUID NOT NULL,
    "definition" TEXT NOT NULL,

    CONSTRAINT "glossary_terms_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "parties_candidate_id_idx" ON "parties"("candidate_id");

-- CreateIndex
CREATE INDEX "candidates_party_id_idx" ON "candidates"("party_id");

-- CreateIndex
CREATE INDEX "party_members_party_id_order_index_idx" ON "party_members"("party_id", "order_index");

-- CreateIndex
CREATE INDEX "base_topic_options_base_topic_id_idx" ON "base_topic_options"("base_topic_id");

-- CreateIndex
CREATE INDEX "party_base_topics_party_id_idx" ON "party_base_topics"("party_id");

-- CreateIndex
CREATE INDEX "party_base_topics_base_topic_id_idx" ON "party_base_topics"("base_topic_id");

-- CreateIndex
CREATE INDEX "party_base_topics_base_topic_option_id_idx" ON "party_base_topics"("base_topic_option_id");

-- CreateIndex
CREATE INDEX "legislations_legislation_group_id_idx" ON "legislations"("legislation_group_id");

-- CreateIndex
CREATE INDEX "party_legislations_party_id_idx" ON "party_legislations"("party_id");

-- CreateIndex
CREATE INDEX "party_legislations_legislation_id_idx" ON "party_legislations"("legislation_id");

-- CreateIndex
CREATE INDEX "party_legislations_option_id_idx" ON "party_legislations"("option_id");

-- CreateIndex
CREATE INDEX "recent_actions_party_id_order_index_idx" ON "recent_actions"("party_id", "order_index");

-- CreateIndex
CREATE INDEX "recent_actions_action_group_id_idx" ON "recent_actions"("action_group_id");

-- CreateIndex
CREATE INDEX "future_promises_party_id_order_index_idx" ON "future_promises"("party_id", "order_index");

-- CreateIndex
CREATE INDEX "future_promises_action_group_id_idx" ON "future_promises"("action_group_id");

-- CreateIndex
CREATE INDEX "candidate_educations_candidate_id_idx" ON "candidate_educations"("candidate_id");

-- CreateIndex
CREATE INDEX "candidate_professionals_candidate_id_idx" ON "candidate_professionals"("candidate_id");

-- CreateIndex
CREATE INDEX "candidate_professionals_group_id_idx" ON "candidate_professionals"("group_id");

-- CreateIndex
CREATE INDEX "candidate_career_actions_candidate_id_order_index_idx" ON "candidate_career_actions"("candidate_id", "order_index");

-- CreateIndex
CREATE INDEX "candidate_career_actions_action_group_id_idx" ON "candidate_career_actions"("action_group_id");

-- CreateIndex
CREATE INDEX "candidate_recent_actions_candidate_id_order_index_idx" ON "candidate_recent_actions"("candidate_id", "order_index");

-- CreateIndex
CREATE INDEX "candidate_recent_actions_action_group_id_idx" ON "candidate_recent_actions"("action_group_id");

-- CreateIndex
CREATE INDEX "public_opinions_candidate_id_order_index_idx" ON "public_opinions"("candidate_id", "order_index");

-- CreateIndex
CREATE INDEX "glossary_terms_glossary_category_id_idx" ON "glossary_terms"("glossary_category_id");

-- AddForeignKey
ALTER TABLE "parties" ADD CONSTRAINT "parties_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "candidates"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidates" ADD CONSTRAINT "candidates_party_id_fkey" FOREIGN KEY ("party_id") REFERENCES "parties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "party_members" ADD CONSTRAINT "party_members_party_id_fkey" FOREIGN KEY ("party_id") REFERENCES "parties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "base_topic_options" ADD CONSTRAINT "base_topic_options_base_topic_id_fkey" FOREIGN KEY ("base_topic_id") REFERENCES "base_topics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "party_base_topics" ADD CONSTRAINT "party_base_topics_party_id_fkey" FOREIGN KEY ("party_id") REFERENCES "parties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "party_base_topics" ADD CONSTRAINT "party_base_topics_base_topic_id_fkey" FOREIGN KEY ("base_topic_id") REFERENCES "base_topics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "party_base_topics" ADD CONSTRAINT "party_base_topics_base_topic_option_id_fkey" FOREIGN KEY ("base_topic_option_id") REFERENCES "base_topic_options"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "legislations" ADD CONSTRAINT "legislations_legislation_group_id_fkey" FOREIGN KEY ("legislation_group_id") REFERENCES "legislation_groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "party_legislations" ADD CONSTRAINT "party_legislations_party_id_fkey" FOREIGN KEY ("party_id") REFERENCES "parties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "party_legislations" ADD CONSTRAINT "party_legislations_legislation_id_fkey" FOREIGN KEY ("legislation_id") REFERENCES "legislations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "party_legislations" ADD CONSTRAINT "party_legislations_option_id_fkey" FOREIGN KEY ("option_id") REFERENCES "legislation_options"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recent_actions" ADD CONSTRAINT "recent_actions_party_id_fkey" FOREIGN KEY ("party_id") REFERENCES "parties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recent_actions" ADD CONSTRAINT "recent_actions_action_group_id_fkey" FOREIGN KEY ("action_group_id") REFERENCES "action_groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "future_promises" ADD CONSTRAINT "future_promises_party_id_fkey" FOREIGN KEY ("party_id") REFERENCES "parties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "future_promises" ADD CONSTRAINT "future_promises_action_group_id_fkey" FOREIGN KEY ("action_group_id") REFERENCES "action_groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_educations" ADD CONSTRAINT "candidate_educations_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "candidates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_professionals" ADD CONSTRAINT "candidate_professionals_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "candidates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_professionals" ADD CONSTRAINT "candidate_professionals_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "professional_groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_career_actions" ADD CONSTRAINT "candidate_career_actions_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "candidates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_career_actions" ADD CONSTRAINT "candidate_career_actions_action_group_id_fkey" FOREIGN KEY ("action_group_id") REFERENCES "action_groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_recent_actions" ADD CONSTRAINT "candidate_recent_actions_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "candidates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_recent_actions" ADD CONSTRAINT "candidate_recent_actions_action_group_id_fkey" FOREIGN KEY ("action_group_id") REFERENCES "action_groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public_opinions" ADD CONSTRAINT "public_opinions_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "candidates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "glossary_terms" ADD CONSTRAINT "glossary_terms_glossary_category_id_fkey" FOREIGN KEY ("glossary_category_id") REFERENCES "glossary_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
