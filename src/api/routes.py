"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, current_app # type: ignore
from flask_bcrypt import Bcrypt # type: ignore
from api.models import db, User, Product, Profession, UserProfession, Favorite, Recipe, Cart
from api.utils import generate_sitemap, APIException
from flask_cors import CORS # type: ignore
from flask_jwt_extended import get_jwt_identity, jwt_required, create_access_token # type: ignore
import mercadopago # type: ignore
import json, os
import cloudinary # type: ignore
import cloudinary.uploader # type: ignore
# from models import db, Professional
sdk = mercadopago.SDK("APP_USR-2815099995655791-092911-c238fdac299eadc66456257445c5457d-1160950667")
api = Blueprint('api', __name__)
from flask import render_template # type: ignore
# Allow CORS requests to this API
CORS(api)

# cloudinary.config(
#     cloud_name=os.getenv['CLOUDINARY_CLOUD_NAME'],
#     api_key=os.getenv['CLOUDINARY_API_KEY'],
#     api_secret=os.getenv['CLOUDINARY_API_SECRET']
# )

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

# ENDPOINTS PARA LOGIN
#POST User (Crear un usuario)

@api.route('/user', methods=['POST'])
def add_new_user():
    request_body= request.get_json()
    # print(request_body)
    especific_user= User.query.filter_by(email=request_body['email']).first() #me permite filtrar si el email existe
    if especific_user:
        return jsonify({"msj":"El usuario ya existe"}), 404 #en el caso que exista me avisa y da el error 404
    
    pw_hash = current_app.bcrypt.generate_password_hash(request_body["password"]).decode("utf-8")

    new_user = User(
        # id_role = request_body ['id_role']# informacion que quiero de mi usuario y que tengo contenida en mi request_body
        name = request_body['name'],
        email = request_body['email'],
        password = pw_hash,
        address = request_body ['address'],
        phone = request_body  ['phone'],
        is_active = request_body ['is_active'],
        role_id = request_body ['role_id']
    )
    # print(new_user)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"msj":"El usuario fue creado"}), 201

# POST login
@api.route("/login", methods=["POST"])
def login():
    
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    #cuando me llega la info del usuario, consulto a la bd si la informacion es correcta o no
    user_query = User.query.filter_by(email=email).first() #en mi solicitud hago un filtro con email
    if user_query is None:
        return jsonify({"msg":"Usuario no registrado"}), 404
    checkPass = current_app.bcrypt.check_password_hash(user_query.password, password)

    if email != user_query.email or not checkPass:
        return jsonify({"msg": "Correo o contraseña incorrectos"}), 401

    access_token = create_access_token(identity=email)
    return jsonify({"access_token":
    access_token,"user":user_query.serialize()}), 200

@api.route("/private", methods=["GET"])
@jwt_required()
def private():
    # Access the identity of the current user with get_jwt_identity
    #con la identidad valida del usuario hago a User una consulta para retornar una respuesta
    #con la informacion de usuario propiamente dicho
    current_user = get_jwt_identity() #verifica si mi correo tiene una identidad
    # print(current_user)
    return jsonify(logged_in_as=current_user), 200 #me retorna current_user= email

@api.route("/valid_token", methods=["GET"])
@jwt_required()
def valid_token():
    # Access the identity of the current user with get_jwt_identity
    #con la identidad valida del usuario hago a User una consulta para retornar una respuesta
    #con la informacion de usuario propiamente dicho
    current_user = get_jwt_identity() #verifica si mi correo tiene una identidad
    user_exist = User.query.filter_by(email = current_user).first()
    # print(user_exist)
    # print(current_user)
    if user_exist is None:
        return jsonify (logged = False), 404
    return jsonify(logged = True, user = user_exist.serialize()), 200

# Get users
@api.route('/users', methods=['GET'])
def get_users():
    all_users= User.query.all()
    if all_users == []: #si mi array esta vacio entonces return envia el msj no exiten usarios
        return jsonify({"msj":"No existen usarios"}), 404 #si entra en el if la funcion termina ahi.
    
    result= list(map(lambda item:item.serialize(),all_users)) # linea de codigo que me perite listar todos los usuarios

    response_body = {
        "msg": "Estos son tus usuarios", 
        "results": result #muestra tus usuarios todos listados
    }
    return jsonify(response_body), 200

# get user especifico
@api.route('/users/<int:id>', methods=['GET'])
def get_user(id):
    # print(id)
    especific_user= User.query.filter_by(id=id).first()
    if especific_user is None:
        return jsonify({"msj":"El usuario no existe"}), 404
    # print(especific_user)
    query_result= especific_user.serialize()
    # print(query_result)
    return jsonify(query_result), 200

#ENDPOINT DELETE
@api.route('/user/<int:id>', methods=['DELETE'])
def delete_user(id):
    especific_user= User.query.filter_by(id=id).first() #me permite filtrar si el usuario existe
    if especific_user is None:
        return jsonify({"msg":"El usuario no existe"}), 404#result es mi lista de favoritos para ese id
    

    db.session.delete(especific_user)
    db.session.commit()    
    return jsonify({"msj":"Usuario eliminado correctamente"}), 200
bcrypt = Bcrypt()
# PUT user
@api.route('/users/<int:id>', methods=['PUT'])
@jwt_required()
def update_user(id):
    # current_user_email = get_jwt_identity #obtengo el id del usuario actual y lo comparo con el usuario autenticado
    # if current_user_id != id:          # si el id del usuario actual no es igual al id atenticado 
    #     return jsonify ({"msg":"Unauthorized"}), 403
    data = request.get_json()
    user = User.query.filter_by(id=id).first()#la variable user me define es el usuario que busco para actualizar
    if user is None:
        return jsonify({"msg":"El usuario no existe"}), 404
# actualiza datos del usuario
    if 'name' in data:
        user.name = data ['name']
    if 'email' in data:
        user.email = data ['email']
    if 'password' in data:
      user.password = bcrypt.generate_password_hash(data['password']).decode("utf-8")
    if 'address' in data:
        user.address = data ['address']
    if 'phone' in data:
        user.phone = data ['phone']
    if 'is_active' in data:
        user.is_active = data ['is_active']
    if 'id_role' in data:
        user.id_role = data ['id_role']
# guardo los cambios en la db
    db.session.commit()
    return jsonify (user.serialize(),{"msg":"El usuario ha sido actualizado"}), 200

#ENDPOINTS - GET Professionals (Nutricionistas - Personal Trainers)   
@api.route('/users/personal-trainers', methods=['GET'])
def get_personal_trainers():
    profession = Profession.query.filter(Profession.name.ilike('personal trainer')).first() 

    if not profession:
        return jsonify({"error": "Profesión 'Personal Trainer' no encontrada"}), 404
    
    #obtengo los usuarios con la profesión personal trainer
    users = User.query.join(UserProfession).filter(
        UserProfession.profession_id == profession.id
    ).all()

    return jsonify([user.serialize() for user in users]), 200

@api.route('/users/nutritionists', methods=['GET'])
def get_nutritionists():
    profession = Profession.query.filter(Profession.name.ilike('nutricionista')).first()
    # print(profession)
    if not profession:
        return jsonify({"error": "Profesión 'Nutricionista' no encontrada"}), 404
    
    #obtengo los usuarios con profesión Nutricionista
    users = User.query.join(UserProfession).filter(
        UserProfession.profession_id == profession.id
    ).all()

    return jsonify([user.serialize() for user in users]), 200

# ENDPOINT PRODUCTOS
#GET products
@api.route('/products', methods=['GET'])
def get_products():
    all_products = Product.query.all()
    if all_products == []: #sin productos
        return jsonify({"msj":"No hay productos disponibles"}), 404 
    
    result= list(map(lambda item:item.serialize(),all_products))

    response_body = {
        "msg": "Todos los productos", 
        "results": result #tus productos
    }
    return jsonify(response_body), 200

# GET product
@api.route('/product/<int:id>', methods=['GET'])
def get_product(id):
    # print(id)
    especific_product= Product.query.filter_by(id=id).first()
    if especific_product is None:
        return jsonify({"msj":"Producto no encontrado"}), 404
    # print(especific_product)
    query_result= especific_product.serialize()
    # print(query_result)
    return jsonify(query_result), 200

# GET product image
@api.route('/product/<int:id>/image', methods=['GET'])
def get_product_image(id):
    try:
        product= Product.query.filter_by(id=id).first()

        if not product.image_url:
            return jsonify({"msj": "El producto no tiene imagen"}), 404
        
        return jsonify({'image-url': product.image_url}), 200
    except Exception as e:
        return jsonify({"msj":str(e)}), 500
    
#DELETE 
@api.route('/product/<int:id>', methods=['DELETE'])
def delete_product(id):
    especific_product= Product.query.filter_by(id=id).first() 
    if especific_product is None:
        return jsonify({"msg":"El producto no existe"}), 404

    db.session.delete(especific_product)
    db.session.commit()    
    return jsonify({"msj":"Producto eliminado correctamente"}), 200

# Agregar producto
@api.route('/product', methods=['POST'])
def add_new_product():
    request_body= request.get_json()
    new_product = Product(
        name = request_body['name'],
        cost = request_body['cost'],
        image_url = request_body['image_url']
    )
    db.session.add(new_product)
    db.session.commit()
    return jsonify({"msj":"Producto agregado"}), 201

# Actualizar productos
@api.route('/products/<int:id>', methods=['PUT'])
def update_product(id):
    data = request.get_json()
    product = Product.query.filter_by(id=id).first()
    if product is None:
         return jsonify({"msg":"El producto no existe"}), 404
# actualiza datos
    if 'name' in data:
        product.name = data ['name']
    if 'cost' in data:
        product.cost = data ['cost']
    if 'image_url' in data:
        product.image_url = data ['image_url']
    db.session.commit()
    return jsonify (product.serialize(),{"msg":"El producto ha sido actualizado"}), 200

@api.route('/wishlist/users', methods=['GET'])
@jwt_required()
def get_favorites_by_user_id():
    user = get_current_user()

    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404
    
    favorite = Favorite.query.filter_by(user_id=user.id).all()
    result= list(map(lambda item:item.serialize(),favorite))
    return jsonify (result), 200

def get_current_user():
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()
    return user

# agregar Favorito
@api.route('/wishlist/user', methods=['POST'])
@jwt_required()
def add_favorite():
    user = get_current_user()

    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404
    
    fav_product = request.json.get('fav_product', None)
    
    existing_favorite = Favorite.query.filter_by(user_id=user.id, fav_product=fav_product).first()

    if existing_favorite:
        return jsonify({"msg": "El producto ya está en favoritos."}), 200
    
    new_favorite = Favorite(user_id=user.id, fav_product=fav_product)
    db.session.add(new_favorite)
    db.session.commit()
    return jsonify({"msg": "Favorito creado."}), 201

#delete Favorite
#Elimina un favorito identificado por su id y verifica que pertenezca al usuario autenticado.
@api.route('wishlist/<int:favorite_id>', methods=['DELETE'])
@jwt_required()
def delete_favorite(favorite_id):
    user = get_current_user()

    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    favorite = Favorite.query.filter_by(id=favorite_id, user_id=user.id).first()
    if not favorite:
        return jsonify({"msg": "Favorito no encontrado."}), 404

    db.session.delete(favorite)
    db.session.commit()

    return jsonify({"msg": "Favorito eliminado exitosamente."}), 200

# Obtener productos del carrito de un usuario autenticado
@api.route('/cart', methods=['GET'])
@jwt_required()
def get_cart_by_user_id():
    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()

    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404
    
    cart_items = Cart.query.filter_by(user_id=user.id).all()
    result = list(map(lambda item: item.serialize(), cart_items))
    return jsonify(result), 200

# Carrito de Compras
@api.route('/cart/', methods=['POST'])
@jwt_required()
def add_to_cart():
    user = get_current_user()
    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    data = request.get_json()
    product_id = data.get('product_id')
    units = data.get('units')
    total_amount = data.get('total_amount')

    if not (product_id and units is not None and total_amount is not None):
        return jsonify({"msg": "Datos faltantes"}), 400

    existing_item = Cart.query.filter_by(user_id=user.id, product_id=product_id).first()
    if existing_item:
        existing_item.units += units
        existing_item.total_ammount += total_amount
    else:
        new_item = Cart(user_id=user.id, product_id=product_id, units=units, total_ammount=total_amount)
        db.session.add(new_item)

    db.session.commit()
    return jsonify({"msg": "Producto agregado al carrito"}), 200

@api.route('/cart/product/<int:product_id>', methods=['DELETE'])
@jwt_required()
def delete_product_from_cart(product_id):
    user = get_current_user()
    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    cart_item = Cart.query.filter_by(user_id=user.id, product_id=product_id).first()
    if not cart_item:
        return jsonify({"msg": "Producto no encontrado en el Carrito"}), 404

    db.session.delete(cart_item)
    db.session.commit()
    return jsonify({"msg": "Producto eliminado del Carrito"}), 200

#MERCADO PAGO
@api.route("/preference", methods=["POST"]) 
def preference(): 
    # body = json.loads(request.data)  # aca trae la info 
 # acá vamos a poner más líneas de código 
    body = json.loads(request.data)  # aca esta toda  la info 
    total = body["total"]   # acá decimos que en el  body mandamos el total a pagar por el cliente? 
 # Crea un ítem en la preferencia 
    preference_data = { 
    "items": [ 
        {
        # "title": "Mi producto",  #estas líneas las vamos a poder editar con los datos de nuestra API. 
        # "quantity": 1,   #estos tres son los requeridos obligatoriamente por mercadopago. 
        # "unit_price": 75.76,   #aca va el total a pagar por el cliente. 
        "title": request.json.get('title', 'Mi producto'),
        "quantity": int(request.json.get('quantity', 1)),
        # "unit_price": float(request.json.get('price', 100))
        "unit_price":total
 #también podríamos mandar más datos como nombre del producto, etc. 
    } ],
 # acá vamos a poner más líneas de código

    "payer":{ 
     "email":"test_user_17805074@testuser.com"  #este es el usuario de prueba comprador 
 }, 
    "back_urls": { 
    "success": os.getenv('FRONTEND_URL') + '/pay-callback/success', 
    "failure": os.getenv('FRONTEND_URL') + '/pay-callback/failure', 
    "pending": os.getenv('FRONTEND_URL') + '/pay-callback/pending', #  En 
 #este caso las tres están configuradas para que lo manden de nuevo a la página home de la app. 
 }, 
    "auto_return": "approved" 
 }  #preference es  el nombre que le dimos a nuestra ruta para pagar con mercadopago  
 #acá vamos a poner más líneas de código 
    preference_response = sdk.preference().create(preference_data) 
    preference = preference_response["response"] 
    return preference, 200 

@api.route('/')
def home():
    products = Product.query.all()
    return render_template('home.html', products=products)   
 
@api.route('/upload', methods=['POST'])
@jwt_required()
def upload_image():
    # print(request.files)
    file = request.files['image']
    result = cloudinary.uploader.upload(file)
    return result, 200
