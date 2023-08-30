#!/usr/bin/env python3
""" A flask app that uses the user locale """
from flask import Flask, render_template, request, g
from flask_babel import Babel
from typing import Union, Dict
import pytz


class Config:
    """ class attributes equal to en & fr
    """
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


app = Flask(__name__)
app.url_map.strict_slashes = False
babel = Babel(app)
app.config.from_object(Config)
users = {
    1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
    2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
    3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
    4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}


def get_user() -> Union[dict, None]:
    """ Return a user based on their id.
    """
    user_id = request.args.get('login_as')
    if user_id:
        return users.get(int(user_id))
    return None


@app.before_request
def before_request() -> None:
    """ Routine resolutions to be performed before each request
    """
    user = get_user()
    g.user = user


@babel.localeselector
def get_locale():
    """ The get locale method """
    locale = request.args.get('locale', '')
    if locale in app.config['LANGUAGES']:
        return locale
    if g.user and g.user['locale'] in app.config['LANGUAGES']:
        return g.user['locale']
    header_locale = request.headers.get('locale', '')
    if header_locale in app.config['LANGUAGES']:
        return header_locale
    return request.accept_languages.best_match(app.config["LANGUAGES"])


@babel.timezoneselector
def get_timezone():
    """ Using the get timezone method """
    timezone = request.args.get('timezone', '')
    if timezone:
        try:
            pytz.timezone(timezone)
            return timezone
        except pytz.UnknownTimeZoneError:
            pass

    if g.user and g.user['timezone']:
        try:
            pytz.timezone(get_user['timezone'])
            return g.user['timezone']
        except pytz.UnknownTimeZoneError:
            pass

    header_timezone = request.args.get('timezone', '')
    if header_timezone:
        try:
            pytz.header_timezone(header_timezone)
            return header_timezone
        except pytz.UnknownTimeZoneError:
            pass


@app.route("/")
def index():
    """ Return render template """
    return render_template('7-index.html')


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
