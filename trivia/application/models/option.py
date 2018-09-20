"""Question Option model"""

from flask_sqlalchemy import SQLAlchemy
from application.utils.extensions import DB, MA
from flask_marshmallow import Marshmallow
from sqlalchemy.exc import SQLAlchemyError

class Option(DB.Model):
    """Question option table structure."""
    id = DB.Column(DB.Integer, primary_key=True, autoincrement=True)
    question_id = DB.Column(DB.Integer, DB.ForeignKey("question.id"))
    content = DB.Column(DB.Text)
    position = DB.Column(DB.Integer)

    def __init__(self, question_id, content, position):
        self.question_id = question_id
        self.content = content
        self.position = position

    def create(self):
        try:
            DB.session.add(self)
            DB.session.commit()
            return self
        except SQLAlchemyError as err:
                print(err)
                return None

class OptionSchema(MA.Schema):
    """Fields to convert to JSON."""
    class Meta:
        """Fields to expose"""
        model = Option
        fields = ("id", "question_id", "content", "position")

