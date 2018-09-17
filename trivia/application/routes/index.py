
from flask import Flask, request, jsonify, Blueprint
from flask_sqlalchemy import SQLAlchemy

BP = Blueprint("index", __name__)

@BP.route("/")
def welcome():
    """Start point to test"""
    return "Welcome to the jungle"

