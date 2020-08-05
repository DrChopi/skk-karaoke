import re

class Validator:
    def string(str):
        return re.search('^[A-Za-z0-9$_-]+$', str)

    def integer(i):
        return (i%1) + 2 == 2

    def mail(str):
        return re.search('[^@ ]+@[^@ ]+\.[^@ ]+', str)