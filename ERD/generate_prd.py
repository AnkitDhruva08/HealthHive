from graphviz import Digraph

# Create the ER diagram
dot = Digraph(comment='HealthHive ER Diagram', format='png')
dot.attr(rankdir='LR', size='10')

# Entities
entities = {
    "Users": ["id (PK)", "name", "email", "phone", "role", "password_hash", "created_at"],
    "Doctors": ["id (PK)", "user_id (FK)", "specialization", "license_no", "experience_years", "rating", "created_at"],
    "Doctor_Availability": ["id (PK)", "doctor_id (FK)", "day_of_week", "start_time", "end_time"],
    "Vitals_Records": ["id (PK)", "patient_id (FK)", "heart_rate", "spo2", "temperature", "timestamp"],
    "Alerts": ["id (PK)", "patient_id (FK)", "doctor_id (FK)", "vitals_id (FK)", "alert_type", "status", "created_at"],
    "Appointments": ["id (PK)", "patient_id (FK)", "doctor_id (FK)", "scheduled_time", "status", "notes", "created_at"],
    "Medicine_Orders": ["id (PK)", "alert_id (FK)", "medicine_name", "dosage", "quantity", "status", "created_at"],
    "Deliveries": ["id (PK)", "order_id (FK)", "driver_id (FK)", "delivery_status", "eta", "completed_at"]
}

# Add entity nodes
for entity, fields in entities.items():
    label = f"""<<TABLE BORDER='1' CELLBORDER='1' CELLSPACING='0'>
    <TR><TD BGCOLOR='lightblue'><B>{entity}</B></TD></TR>"""
    for field in fields:
        label += f"<TR><TD>{field}</TD></TR>"
    label += "</TABLE>>"
    dot.node(entity, label=label, shape='plaintext')

# Relationships
relationships = [
    ("Doctors", "Users"),
    ("Doctor_Availability", "Doctors"),
    ("Vitals_Records", "Users"),
    ("Alerts", "Vitals_Records"),
    ("Alerts", "Users"),
    ("Appointments", "Users"),
    ("Appointments", "Doctors"),
    ("Medicine_Orders", "Alerts"),
    ("Deliveries", "Medicine_Orders")
]

for src, dst in relationships:
    dot.edge(src, dst)

# Save and render
file_path = '/home/atlantick-solutions/Desktop/HealthHive/healthhive_erd'
dot.render(file_path, cleanup=True)

print("ER diagram generated at:", file_path + '.png')
