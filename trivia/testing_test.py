"""
Unit tests for trivia.py
"""

import unittest

from test import *

class TestClass(unittest.TestCase):
    def test_hello(self):
        self.assertEqual(hello_world(), 'hello world')

if __name__ == '__main__':
    unittest.main()
