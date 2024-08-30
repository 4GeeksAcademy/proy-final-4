  
import os
from flask_admin import Admin
from .models import db, User, Role, Profession, Fee, Favorite, Recipe, Ingredient, RecipeIngredient, Product, Cart, Order, UserProfession
# from .models import UserCalendly

from flask_admin.contrib.sqla import ModelView


def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(Role, db.session))
    admin.add_view(ModelView(Profession, db.session))
    admin.add_view(ModelView(UserProfession, db.session))
    admin.add_view(ModelView(Fee, db.session))
    admin.add_view(ModelView(Favorite, db.session))
    admin.add_view(ModelView(Recipe, db.session))
    admin.add_view(ModelView(Ingredient, db.session))
    admin.add_view(ModelView(RecipeIngredient, db.session))
    admin.add_view(ModelView(Product, db.session))
    admin.add_view(ModelView(Cart, db.session))
    admin.add_view(ModelView(Order, db.session))
    # admin.add_view(ModelView(UserCalendly, db.session))




    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))