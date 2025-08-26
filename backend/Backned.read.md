⚡ Migration Note:
If you already created the table, removing unique=True in the model won’t change the DB automatically.

You have 2 options:

Drop & recreate tables (only if you don’t have real data):

alembic downgrade base
alembic upgrade head


or Base.metadata.drop_all(bind=engine) → Base.metadata.create_all(bind=engine).

If using Alembic migrations → generate a migration:

alembic revision --autogenerate -m "drop unique constraint from users.email"
alembic upgrade head
