from flask_sqlalchemy import SQLAlchemy  # type: ignore
db = SQLAlchemy()

# id	id-role	name	email	pasword	address	phone	is_active
class User(db.Model):
        id = db.Column(db.Integer, primary_key=True)
        role_id = db.Column(db.Integer,db.ForeignKey("role.id"), nullable=False)
        name = db.Column(db.String(120), nullable=False)
        email = db.Column(db.String(120), unique=True, nullable=False)
        password = db.Column(db.String(80), unique=False, nullable=False)
        address = db.Column(db.String(80), unique=False, nullable=False)
        phone = db.Column(db.String(80), unique=False, nullable=False)
        is_active = db.Column(db.Boolean(), unique=False, nullable=False)
        calendly_name = db.Column(db.String(120), nullable=True)
        description = db.Column(db.String(2000), nullable=True)
        favorites = db.relationship("Favorite", backref="user")
        cart = db.relationship("Cart", backref="user")
        user_professions = db.relationship("UserProfession", backref="user", lazy='dynamic')
        # calendly=db.relationship("UserCalendly")

        def __repr__(self):
            return f'<User {self.email}>'

        def serialize(self):
            return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            # do not serialize the password, its a security breach
            "address":self.address,
            "phone": self.phone,
            "is_active":self.is_active,
            "calendly_name": self.calendly_name,
            "description": self.description,
            "professions":[user_profession.serialize() for user_profession in self.user_professions.all()]
        }
        # def serialize_nutritionist(self):
        #      user=self.serialize()
        #      user["calendly_name"] = self.calendly.name
        #      return user
        
class Role(db.Model):
        id = db.Column(db.Integer, primary_key=True)
        name = db.Column(db.String(120), unique=True, nullable=False)
        users = db.relationship("User", backref="role")

        def __repr__(self):
            return f'<Role {self.name}>'

        def serialize(self):
            return {
            "id": self.id,
            "name": self.name,
        }

class Profession(db.Model):
        id = db.Column(db.Integer, primary_key=True)
        name = db.Column(db.String(120), unique=True, nullable=False)
        user_professions = db.relationship('UserProfession', backref='profession', lazy='dynamic')

        def __repr__(self):
            return f'<Profession {self.id}>'

        def serialize(self):
            return {
            "id": self.id,
            "name": self.name
        }

class UserProfession(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    profession_id = db.Column(db.Integer, db.ForeignKey('profession.id'), nullable=False)

    def __repr__(self):
        return f'<UserProfession {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "profession": self.profession.serialize()
        }

#  id	id-user	id-profesion	importe       
class Fee(db.Model):
        id = db.Column(db.Integer, primary_key=True)
        user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
        profession_id = db.Column(db.Integer,db.ForeignKey("profession.id"), nullable=False)
        amount = db.Column(db.Float, nullable=False)

        def __repr__(self):
            return f'<Fee {self.id}>'

        def serialize(self):
            return {
        "id": self.id,
        "user_id": self.user_id,
        "profession_id": self.profession_id,
        "amount": self.amount
    }
    # Favorite id	id-user	fav.rec	fav product
class Favorite(db.Model):
        id = db.Column(db.Integer, primary_key=True)
        user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
        # para que un favorito sea un favorito o un producto deben ser nulleables
        # fav_recipe = db.Column(db.Integer,db.ForeignKey("recipe.id") ,nullable=False)
        # fav_product = db.Column(db.Integer,db.ForeignKey("product.id"), nullable=False)
        fav_recipe = db.Column(db.Integer,db.ForeignKey("recipe.id") ,nullable=True)
        fav_product = db.Column(db.Integer,db.ForeignKey("product.id"), nullable=True)

        def __repr__(self):
            return f'<Favorite {self.id}>'

        def serialize(self):
            especific_product = Product.query.filter_by(id=self.fav_product).first()
            return {
            "id": self.id,
            "user_id": self.user_id,
            "fav_recipe": self.fav_recipe,
            "fav_product": especific_product.serialize() if especific_product else None
    } 
# Recipe id		name	instr
class Recipe(db.Model):
        id = db.Column(db.Integer, primary_key=True)
        name = db.Column(db.String(120), nullable=False)
        #para instrucciones largas sería mejor usar db.Text en lugar de string(120)
        #instructions = db.Column(db.String(120),nullable=False)
        instructions = db.Column(db.Text,nullable=False)
        favorites = db.relationship("Favorite", backref="recipe")
        recipe_ingredients= db.relationship("RecipeIngredient", backref="recipe")

        def __repr__(self):
            return f'<Recipe {self.id}>'

        def serialize(self):
            return {
            "id": self.id,
            "name": self.name,
            "instructions": self.instructions
    }   
# ingredients id	name
class Ingredient(db.Model):
        id = db.Column(db.Integer, primary_key=True)
        name = db.Column(db.String(120), nullable=False)
        recipe_ingredients= db.relationship("RecipeIngredient", backref="ingredient")

        def __repr__(self):
            return f'<Ingredient {self.id}>'

        def serialize(self):
            return {
            "id": self.id,
            "name": self.name
    }   
# recipe-igredients: id	id-ingredients	id-recipe	quantity	unit
class RecipeIngredient(db.Model):
        id = db.Column(db.Integer, primary_key=True)
        ingredient_id= db.Column(db.Integer, db.ForeignKey("ingredient.id"), nullable=False)
        recipe_id= db.Column(db.Integer, db.ForeignKey("recipe.id"), nullable=False)
        quantity= db.Column(db.Float, nullable=False)
        unit= db.Column(db.String(120), nullable=False)

        def __repr__(self):
            return f'<RecipeIgredient {self.id}>'

        def serialize(self):
            return {
            "id": self.id,
            "ingredient_id": self.ingredient_id,
            "recipe_id": self.recipe_id,
            "quantity": self.quantity,
            "unit": self.unit
    }   
# product:id	name	cost
class Product(db.Model):
        id = db.Column(db.Integer, primary_key=True)
        name= db.Column(db.String(120), nullable=False)
        cost= db.Column(db.Float, nullable=False)
        image_url = db.Column(db.String(300), nullable=True)
        favorites = db.relationship("Favorite", backref="product")
        cart = db.relationship("Cart", backref="product")

        def __repr__(self):
            return f'<Product {self.id}>'

        def serialize(self):
            return {
            "id": self.id,
            "name": self.name,
            "cost": self.cost,
            "image_url": self.image_url
    }  
# cart:id	id-user	id-product	units	importe-total
class Cart(db.Model):
        id = db.Column(db.Integer, primary_key=True)
        user_id= db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
        product_id= db.Column(db.Integer,db.ForeignKey("product.id"), nullable=False)
        units= db.Column(db.Integer, nullable=False)
        total_ammount= db.Column(db.Float, nullable=False)
        order = db.relationship("Order", backref="cart")
        
        def __repr__(self):
            return f'<Cart {self.id}>'

        def serialize(self):
            especific_product = Product.query.filter_by(id=self.product_id).first()
            return {
            "id": self.id,
            "user_id": self.user_id,
            "product": especific_product.serialize() if especific_product else None,
            "units": self.units,
            "total_ammount": self.total_ammount,
    }  
#order:id	id-car	date	payment-method	total
class Order(db.Model):
        id = db.Column(db.Integer, primary_key=True)
        cart_id= db.Column(db.Integer, db.ForeignKey("cart.id"), nullable=False)
        date= db.Column(db.DateTime, nullable=False)
        # debería ser un string porque almacena valores tipo ("tarjeta de crédito", "efectivo", "paypal")
        # #payment_method= db.Column(db.Float, nullable=False)
        payment_method= db.Column(db.String(60), nullable=False)
        total= db.Column(db.Float, nullable=False)

        def __repr__(self):
            return f'<Order {self.id}>'

        def serialize(self):
            return {
            "id": self.id,
            "cart_id": self.cart_id,
            "date": self.date,
            "payment_method": self.payment_method,
            "total": self.total
    }  