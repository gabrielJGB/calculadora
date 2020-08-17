const $body = document.querySelector('body');
const $button = document.querySelectorAll('.button');
const $main_display = document.querySelector('.main-display');
const $aux_display = document.querySelector('.aux-display');
const $sto = document.querySelector('.sto');
let operator_pressed = false;
let bracket_pressed = false;
let function_pressed = false;
let result = 0;
let sto = '0'


add_button_key_event();

function add_button_key_event() {
    for (i = 0; i < $button.length; i++) {
        $button[i].addEventListener('click', function (e) {
            button = e.target.textContent;
            check_button_pressed(button);
        });
    }

    $body.addEventListener('keypress', function (k) {
        let key = k.key;
        check_button_pressed(key)
    });

}


function check_button_pressed(button) {
    let operators = '/*+-=';
    let variable = '1234567890.()';
    let special = '√^STO 💾';

    if (variable.includes(button)) {
        handle_variable(button);
    }
    else if (operators.includes(button)) {
        handle_operator(button);
    }
    else if (special.includes(button)) {
        handle_special_operator(button)
    }
    else if (button == 'AC') {
        set_main_display_value('');
        set_aux_display_value('');
    }
    else if (button == 'DEL') {
        let main_display_value = get_main_display_value();
        main_display_value = main_display_value.slice(0, -1);
        set_main_display_value(main_display_value);

    }
    else if (button == 'CL') {
        sto = '0';
        $sto.textContent = 'STO';
    }
    else {
    }
}

function handle_variable(variable) {

    if (variable == '(') {
        bracket_pressed = true;
    }
    else if (variable == ')') {
        bracket_pressed = false;
    }
    // chequeo si antes habia una operacion pendiente
    check_pending_operation();
    // escribo los digitos del numero en main_display 
    write_main_display(variable);
}

function handle_operator(operator) {
    operator_pressed = true;
    //si no hay una cuenta pendiente, escribo en aux_display el numero que está en main_display y el signo presionado
    if (get_aux_display_value() == '') {
        set_aux_display_value(get_main_display_value() + operator);
        solve_expression(get_main_display_value())
    }
    else if (get_aux_display_value().search('=') != -1) {
        set_aux_display_value(result + operator);
    }
    else if (bracket_pressed) {
        write_main_display(operator);
        operator_pressed = false;
    }
    else {
        write_aux_display(get_main_display_value());
        solve_expression(get_aux_display_value());
        write_aux_display(operator);
    }
}

function handle_special_operator(operator) {
    if (operator == '√') {
        check_pending_operation();
        write_main_display('sqrt(');
    }
    else if (operator == '^') {
        check_pending_operation();
        write_main_display('^');

    }
    else if ('STO 💾'.includes(operator)) {

        if (sto == '0') {
            sto = get_main_display_value();
            $sto.textContent = 'STO 💾';
        }
        else {
            set_main_display_value(sto)
        }

    }
}

function check_pending_operation() {
    // chequeo si antes de presionar el numero habia una operacion pendiente
    if (operator_pressed) {
        //si se esta empezando resolver una nueva cuenta, limpio el aux_display
        if (get_aux_display_value().search('=') != -1) {
            set_aux_display_value('');
        }
        // limpio el main_display y escribo el siguiente operando
        set_main_display_value('');
        operator_pressed = false;
    }
}

function solve_expression(expression) {
    result = math.evaluate(expression);
    set_main_display_value(result);
}

function get_aux_display_value() {
    let value = $aux_display.value;
    return value;
}

function get_main_display_value() {
    let value = $main_display.value;
    return value;
}

function write_main_display(digit) {
    $main_display.value += digit;
}

function write_aux_display(digit) {
    $aux_display.value += digit;
}

function set_main_display_value(value) {
    $main_display.value = value;
}
function set_aux_display_value(value) {
    $aux_display.value = value;
}
