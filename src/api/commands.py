
import click,json, os # type: ignore
from api.models import db, User,Product,Role, Profession, UserProfession
from flask import Flask # type: ignore
"""
In this file, you can add as many commands as you want using the @app.cli.command decorator
Flask commands are usefull to run cronjobs or tasks outside of the API but sill in integration 
with youy database, for example: Import the price of bitcoin every night as 12am
"""
def setup_commands(app):
    
    """ 
    This is an example command "insert-test-users" that you can run from the command line
    by typing: $ flask insert-test-users 5
    Note: 5 is the number of users to add
    """
    # @app.cli.command("insert-test-users") # name of our command
    # @click.argument("count") # argument of out command
    # def insert_test_users(count):
    #     print("Creating test users")
    #     for x in range(1, int(count) + 1):
    #         user = User()
    #         user.email = "test_user" + str(x) + "@test.com"
    #         user.password = "123456"
    #         user.is_active = True
    #         db.session.add(user)
    #         db.session.commit()
    #         print("User: ", user.email, " created.")

    #     print("All test users created")

    # @app.cli.command("insert-test-products")
    # def insert_test_products():

#This script will add demo data to the database: 
    
    @app.cli.command("insert-test-data")
    def insert_test_data():
        """ Este comando rellenará la base de datos con datos de ejemplo. """
        # db.drop_all()
        # db.create_all()
        try:
            role = [
                    Role(name="User"),
                    Role(name="Admin"),
                    Role(name="Professional")
                    ]
            db.session.add_all(role)
            db.session.commit()

            users = [
                    User(name="Admin",
                        email="admin@gmail.com",
                        password="$2a$12$GmybcvIdjR6oCeZD5cIg6.tHqqNmr0hnL7NLEA3FYgaOIdD9FIRce",
                        address="USA",
                        phone="000000000",
                        is_active=True,
                        calendly_name="",
                        description="",
                        role_id=role[1].id
                     ),
                    # Nutricionistas
                    User(name="Andrea Ordiozola",
                        email="andrea@gmail.com",
                        password="$2a$12$bFf9pWOLemKntj124Y3aO..FrTvXBbfkaQArjacGtwOmIukFPkvJa",
                        address="Durazno",
                        phone="099876543",
                        is_active=True,
                        calendly_name="",
                        description="Soy Andrea Ordiozola Licenciada en nutrición Nutrición deportiva y aplicada en running Antropometria Isak Descenso de peso /aumento de masa muscularutilizo antropometria Isak.",
                        role_id=role[2].id
                    ),
                    User(
                        name="Camila Rodriguez",
                        email="camila.rodriguez@example.com",
                        password="Camila123@",
                        address="Montevideo",
                        phone="099123456",
                        is_active=True,
                        calendly_name="camilarodriguez",
                        description="Soy Camila Rodriguez, Licenciada en nutrición con especialización en dietas vegetarianas y veganas. Me enfoco en crear planes de alimentación que optimicen la salud y el bienestar de mis clientes.",
                        role_id=role[2].id
                    ),
                    User(
                        name="Juan Pérez",
                        email="juan.perez@example.com",
                        password="Juan123@",
                        address="Canelones",
                        phone="098654321",
                        is_active=True,
                        calendly_name="juanperez",
                        description="Juan Pérez, nutricionista especializado en nutrición infantil y adolescente. Trabajo con familias para asegurar una alimentación equilibrada y saludable para los más jóvenes.",
                        role_id=role[2].id
                    ),
                    User(
                        name="Laura Fernandez",
                        email="laura.fernandez@example.com",
                        password="Laura123@",
                        address="Maldonado",
                        phone="097112233",
                        is_active=True,
                        calendly_name="laurafernandez",
                        description="Licenciada Laura Fernandez, experta en nutrición clínica y manejo de enfermedades metabólicas. Mi objetivo es mejorar la calidad de vida de mis pacientes a través de una alimentación personalizada.",
                        role_id=role[2].id
                    ),
                    User(
                        name="Valentina Gomez",
                        email="valentina.gomez@example.com",
                        password="Valentina123@",
                        address="Colonia",
                        phone="095443322",
                        is_active=True,
                        calendly_name="valentinagomez",
                        description="Soy Valentina Gomez, licenciada en nutrición con enfoque en nutrición materno-infantil. Apoyo a las madres en cada etapa, desde el embarazo hasta la lactancia, para garantizar la salud de sus hijos.",
                        role_id=role[2].id
                    ),
                    User(
                        name="Martín Díaz",
                        email="martin.diaz@example.com",
                        password="Martin123@",
                        address="Paysandú",
                        phone="094556677",
                        is_active=True,
                        calendly_name="martindiaz",
                        description="Martín Díaz, especializado en nutrición para la tercera edad. Ofrezco planes de alimentación que ayudan a mejorar la salud y prevenir enfermedades crónicas en adultos mayores.",
                        role_id=role[2].id
                    ),
                    User(
                        name="María López",
                        email="maria.lopez@example.com",
                        password="Maria123@",
                        address="Tacuarembó",
                        phone="091889900",
                        is_active=True,
                        calendly_name="marialopez",
                        description="María López, licenciada en nutrición con un enfoque en la prevención de enfermedades crónicas. Utilizo la alimentación como herramienta para prevenir y controlar enfermedades como la diabetes y la hipertensión.",
                        role_id=role[2].id
                    ),
                    # Personal Trainers
                    User(
                        name="Ricardo Morales",
                        email="ricardo.morales@example.com",
                        password="Ricardo123@",
                        address="Flores",
                        phone="091990011",
                        is_active=True,
                        calendly_name="ricardomorales",
                        description="Ricardo Morales, Personal Trainer especializado en deportes de fuerza y culturismo. Diseño programas de entrenamiento personalizados para mejorar la masa muscular y la fuerza.",
                        role_id=role[2].id
                    ),
                    User(
                        name="Ana Torres",
                        email="ana.torres@example.com",
                        password="Ana123@",
                        address="Soriano",
                        phone="090112233",
                        is_active=True,
                        calendly_name="anatorres",
                        description="Ana Torres, Personal Trainer con enfoque en fitness funcional y entrenamiento HIIT. Ayudo a mis clientes a alcanzar sus objetivos de forma rápida y eficiente.",
                        role_id=role[2].id
                    ),
                    User(
                        name="Carlos Mendez",
                        email="carlos.mendez@example.com",
                        password="Carlos123@",
                        address="Artigas",
                        phone="093445566",
                        is_active=True,
                        calendly_name="carlosmendez",
                        description="Carlos Mendez, especialista en entrenamiento personalizado para pérdida de peso y acondicionamiento físico general. Mi objetivo es ayudar a las personas a estar en su mejor forma física.",
                        role_id=role[2].id
                    ),
                    User(
                        name="Daniela Ruiz",
                        email="daniela.ruiz@example.com",
                        password="Daniela123@",
                        address="Cerro Largo",
                        phone="092556677",
                        is_active=True,
                        calendly_name="danielaruiz",
                        description="Daniela Ruiz, Personal Trainer con especialización en entrenamiento para la salud y el bienestar. Mi misión es mejorar la calidad de vida de mis clientes a través del ejercicio.",
                        role_id=role[2].id
                    ),
                    User(
                        name="Fernando Gutierrez",
                        email="fernando.gutierrez@example.com",
                        password="Fernando123@",
                        address="Rocha",
                        phone="091667788",
                        is_active=True,
                        calendly_name="fernandogutierrez",
                        description="Fernando Gutierrez, entrenador personal especializado en running y triatlón. Trabajo con atletas para mejorar su resistencia y rendimiento en competencias.",
                        role_id=role[2].id
                    ),
                    User(
                        name="Lucia Sanchez",
                        email="lucia.sanchez@example.com",
                        password="Lucia123@",
                        address="Lavalleja",
                        phone="090778899",
                        is_active=True,
                        calendly_name="luciasanchez",
                        description="Lucia Sanchez, Personal Trainer con un enfoque en el entrenamiento de fuerza y movilidad. Ayudo a mis clientes a mejorar su rendimiento físico y evitar lesiones.",
                        role_id=role[2].id
                    ),
                ]               

            db.session.add_all(users)
            db.session.commit()

            profession = [
                    Profession(name="Nutricionista"),
                    Profession(name="Personal Trainer"),
                    ]
            db.session.add_all(profession)
            db.session.commit()

            userprofession = [
                    UserProfession(
                        user_id=users[1].id,
                        profession_id=profession[0].id  # Nutricionist
                    ),
                    UserProfession(
                        user_id=users[2].id,
                        profession_id=profession[0].id  # Nutricionist
                    ),
                    UserProfession(
                        user_id=users[3].id,
                        profession_id=profession[0].id  # Nutricionist
                    ),
                    UserProfession(
                        user_id=users[4].id,
                        profession_id=profession[0].id  # Nutricionist
                    ),
                    UserProfession(
                        user_id=users[5].id,
                        profession_id=profession[0].id  # Nutricionist
                    ),
                    UserProfession(
                        user_id=users[6].id,
                        profession_id=profession[1].id  # Personal Trainer
                    ),
                    UserProfession(
                        user_id=users[7].id,
                        profession_id=profession[1].id  # Personal Trainer
                    ),
                    UserProfession(
                        user_id=users[8].id,
                        profession_id=profession[1].id  # Personal Trainer
                    ),
                    UserProfession(
                        user_id=users[9].id,
                        profession_id=profession[1].id  # Personal Trainer
                    ),
                    UserProfession(
                        user_id=users[10].id,
                        profession_id=profession[1].id  # Personal Trainer
                    ),
                    UserProfession(
                        user_id=users[11].id,
                        profession_id=profession[1].id  # Personal Trainer
                    ),
                    ]
            db.session.add_all(userprofession)
            db.session.commit()

            script_dir = os.path.dirname(__file__) #<-- absolute dir the script is in
            rel_path = "json/products.json"
            abs_file_path = os.path.join(script_dir, rel_path)
            with open(abs_file_path) as f:
                d = json.load(f)
                print(d)
                for product in d:
                    new_product = Product(name=product["name"], cost=product["cost"], image_url=product["image_url"])
                    db.session.add(new_product)
                db.session.commit()

            print("Test data inserted successfully.")
        except Exception as e:
            print(f"An error occurred: {e}")
            db.session.rollback()

