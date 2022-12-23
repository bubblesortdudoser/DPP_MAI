from app.router.questionRouter import bp as bpqst
from app.router.commentRouter import bp as bpcom
from app.cli import bp
from app.db import conn
from app.config import app

app.app_context().push()

app.config.from_pyfile("config.py")
app.config['JSON_AS_ASCII'] = False

conn.init_app(app)

app.register_blueprint(bp)
app.register_blueprint(bpqst)
app.register_blueprint(bpcom)


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")