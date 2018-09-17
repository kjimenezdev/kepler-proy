
from flask import Flask, request, jsonify, Blueprint
from flask_sqlalchemy import SQLAlchemy
from application.utils.extensions import DB

BP = Blueprint("index", __name__)

@BP.route("/")
def welcome():
    """Start point to test"""
    DB.create_all()
    return "Welcome to the jungle"

