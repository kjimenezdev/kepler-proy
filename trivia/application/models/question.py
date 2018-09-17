"""Models to allow data structure creation by sqlalchemy"""

from flask_sqlalchemy import SQLAlchemy
from application.utils.extensions import DB, MA
from flask_marshmallow import Marshmallow

class Question(DB.Model):
    """Question table structure."""
    id = DB.Column(DB.Integer, primary_key=True)
    content = DB.Column(DB.Text, unique=True)

    def __init__(self, content):
        self.content = content

class QuestionSchema(MA.Schema):
    """Fields to convert to JSON."""
    class Meta:
        """Fields to expose"""
        fields = ("id", "content")

