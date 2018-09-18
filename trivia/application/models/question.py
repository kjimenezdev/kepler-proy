"""Question model for SQLAlchemy"""

from flask_sqlalchemy import SQLAlchemy
from application.utils.extensions import DB, MA
from sqlalchemy.exc import SQLAlchemyError
from flask_marshmallow import Marshmallow
from application.models.option import OptionSchema

class Question(DB.Model):
    """Question table structure."""
    id = DB.Column(DB.Integer, primary_key=True)
    content = DB.Column(DB.Text, unique=True)
    correct_idx = DB.Column(DB.Integer)
    options = DB.relationship("Option", backref="question", lazy=True)

    def __init__(self, content, correct_idx):
        self.content = content
        self.correct_idx = correct_idx

    def create(self):
        try:
            DB.session.add(self)
            DB.session.commit()
            return self
        except SQLAlchemyError as err:
            print (err)
            return None

    def delete_all(self):
        try:
            DB.session.delete()
            DB.session.commit()
            return self
        except SQLAlchemyError:
                return None

class QuestionSchema(MA.Schema):

    options = MA.Nested(OptionSchema, many=True)

    """Fields to convert to JSON."""
    class Meta:
        """Fields to expose"""
        fields = ("id", "content", "correct_idx", "options")
