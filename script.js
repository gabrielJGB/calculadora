const $button = document.querySelectorAll('.button');
        const $main_display = document.querySelector('.main-display');
        const $aux_display = document.querySelector('.aux-display');
        let aux_display_value = '';
        let display_aux_exp = ''
        let oparator_pressed = false


        add_buttons_listener()

        function add_buttons_listener() {
            for (i = 0; i < $button.length; i++) {
                $button[i].addEventListener('click', function (e) {
                    button = e.target.textContent;
                    check_button_pressed(button);
                });
            }
        }

        function check_button_pressed(button) {
            let operator = button
            let number = Number(button);
            let is_digit = !Number.isNaN(number);

            //si el boton presionado es un numero
            if (is_digit) {
                aux_display_value = get_aux_display_value()
                // chequeo si antes de presionar el numero habia una operacion pendiente
                if (oparator_pressed){
                    console.log(oparator_pressed)
                    // si habia, limpio el main_display
                    if(aux_display_value.search('=') != -1){
                        set_aux_display_value('')
                        console.log('aca')
                    }
                    set_main_display_value('')
                    oparator_pressed = false
                }
    
                // escribo el numero en main_display
                write_main_display(number);
            }
            // en cambio, si es un operador
            else {
                oparator_pressed = true
 
                if (aux_display_value == '') {
                    $aux_display.value = get_main_display_value() + operator
                }
                else {
                    // si aux no esta vacio, resuelvo y lo muestro en main
                    let main_display_value = get_main_display_value()
                    let aux_display_value = get_aux_display_value()

                    if (aux_display_value.search('=') != -1) {
                        set_aux_display_value(main_display_value)
                    }
                    else {
                        write_aux_display(main_display_value)
                    }
                    aux_display_value = get_aux_display_value()
                    write_aux_display(operator)

                    result = math.evaluate(aux_display_value)
                    set_main_display_value(result)

                }
            }
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
        