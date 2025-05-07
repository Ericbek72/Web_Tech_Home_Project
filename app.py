from bottle import route, run, template, request, static_file

def find_available_port(start_port=8000, end_port=9000):
    """Finds an available port within a specified range."""
    for port in range(start_port, end_port + 1):
        try:
            with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
                s.bind(('localhost', port))
            return port
        except OSError:
            continue  # Port is occupied, try the next one
    return None  # No available port found in the range

@route('/')
def index():
    return static_file('index.html', root='./')

@route('/Gallery.html')
def gallery():
    return static_file('Gallery.html', root='./')

@route('/Services.html')
def services():
    return static_file('Services.html', root='./')

@route('/select_payment', method='POST')
def select_payment():
    selected_service = request.forms.get('service')
    return template('payment_options.html', service=selected_service) # Render the new template

@route('/process_payment', method='POST')
def process_payment():
    selected_service = request.forms.get('service')
    payment_method = request.forms.get('payment_method')
    return f"<h2>Processing payment for '{selected_service}' using '{payment_method}' (Not implemented!)</h2>"

@route('/<filename:path>')
def static(filename):
    return static_file(filename, root='./')

@route('/style.css')
def style():
    return static_file('style.css', root='./')

@route('/Gridstyle.css')
def gridstyle():
    return static_file('Gridstyle.css', root='./')

if __name__ == '__main__':
    available_port = find_available_port()
    if available_port:
        print(f"Running Bottle application on port: {available_port}")
        run(host='localhost', port=available_port, debug=True, reloader=True)
    else:
        print("Could not find an available port in the specified range.")