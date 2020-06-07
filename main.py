from flask import Flask, request, render_template 
# Flask is main app
# request allow to extract parameters from url 
# render_template allow python function to return html 

app = Flask(__name__)


@app.route("/hello")
def hello():
    return "hello world"

@app.route('/')
def get_homepage():
    return render_template('index.html')


@app.route('/1')
def get_1():
    return render_template('1.html')


@app.route('/2')
def get_2():
    return render_template('2.html')


@app.route('/3')
def get_3():
    return render_template('3.html')


@app.route('/4')
def get_4():
    return render_template('4.html')


@app.route('/5')
def get_5():
    return render_template('5.html')


@app.route('/final')
def get_final():
    return render_template('final.html')


@app.route('/about')
def get_about():
    return render_template('about.html')


@app.route('/contact')
def get_contact():
    return render_template('contact.html')


app.run (debug=True)
