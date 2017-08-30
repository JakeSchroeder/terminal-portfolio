var windowHeight = window.innerHeight;
var windowWidth = window.innerWidth;

var terminalWindow = document.querySelector('.window');
// terminalWindow.style.left = (windowWidth / 2) - terminalWindow.offsetWidth / 2+ 'px';
//
// terminalWindow.style.top = (windowHeight / 2) - terminalWindow.offsetHeight / 2 + 'px';
terminalWindow.style.top = (windowHeight/2) - terminalWindow.offsetHeight / 2 + 'px';
terminalWindow.style.left = (windowWidth/2) - terminalWindow.offsetWidth / 2 + 'px';


document.addEventListener('DOMContentLoaded', function () {

    // Get the date for our fake last-login
    var date = new Date().toString(); date = date.substr(0, date.indexOf("GMT") - 1);

    // Display last-login and promt
    $('.date').append("Last login: " + date + " on ttys000\n");

    $('.close').on('click', function () {
       alert('Please no, dont do that :(');
    });

    $('.minimize').on('click', function () {
       alert('Im sorry, you can\'t minimize this awesomeness ;\)');
    });

    $('.maximize').on('click', function () {
        if (terminalWindow.style.width != '100%') {
            console.log('its not 100%');
            $(terminalWindow).css({
                left: '50%',
                top: '50%',
                transform: 'translateY(-50%) translateX(-50%)',
                height: '100%',
                width: '100%'
            });
            terminalWindow.setAttribute('data-x', '0');
            terminalWindow.setAttribute('data-y', '0');


        } else {
            console.log('its 100%');
            $('.window').css({
                'height': '80%',
                'width': '80%',
                left: '0px',
                top: '0px',
                transform: 'none'
            });


        }

    });



    var beginTerminal = function () {
        /*
   //	Made with <3 by Marcus Bizal
   //	github.com/marcbizal
   //	linkedin.com/in/marcbizal
   */

        "use strict";

        // UTILITY
        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }

        function createLi(text) {
            var newLi = document.createElement('li');
            newLi.innerHTML = text;
            return newLi;
        }
        // END UTILITY

        // COMMANDS
        function clear() {
            terminal.text("");
        }

        function help() {
            var ul = document.createElement('ul');
            ul.class = 'help-list';
            ul.appendChild(createLi('clear'));
            ul.appendChild(createLi('about-me'));
            ul.appendChild(createLi('my-work'));
            ul.appendChild(createLi('contact'));
            ul.appendChild(createLi('credit'));
            // terminal.append('\n');
            terminal.append(ul);
            // terminal.append('\n');
        }

        function about() {
            terminal.append('My name is Jake Schroeder; I am 18 and I am currently studying Design and Technology at <a target="_blank" href="https://www.newschool.edu/parsons/">Parsons school of design</a>. I live in Manhattan NY and I plan on staying here a while. I enjoy every aspect of digital product creation. From design to development to production, I love the process. When people ask me what I do, I tell them that I deal in ideas but more specifically ideas that push the boundaries of innovation. Most of these ideas, I discard but the ones that involve utilizing technology, I pursue. I hope to have a future in front-end software development and one day build something of my own. Thank you for visiting :)\n');
        }

        function work() {
            var ul = document.createElement('ul');
            ul.class = 'work-list';
            ul.appendChild(createLi('<a href="http://incline.azurewebsites.net/" target="_blank">Incline Fitness</a>'));
            ul.appendChild(createLi('<a href="https://drive.google.com/file/d/0BxfG2U55qf7XMXBfRFpiQlRweUk/view?usp=sharing" target="_blank">Incline Fitness Branding Guide</a>'));
            ul.appendChild(createLi('<a href="http://heliosinsights.com/" target="_blank">Helios IPM</a>'));
            ul.appendChild(createLi('<a href="https://www.ipdocketingrules.com/index.php?title=Main_Page" target="_blank">IP Docketing Rules</a>'));

            // terminal.append('\n');
            terminal.append(ul);
            // terminal.append('\n');
        }

        function contact() {

        }

        function credit() {
            var ul = document.createElement('ul');
            ul.class = 'credit-list';
            ul.appendChild(createLi('<a href="https://codepen.io/marcbizal/pen/VLKoam?q=terminal&limit=all&type=type-pens" target="_blank">Terminal Functionality by: Marcus Bizal</a>'));
            ul.appendChild(createLi('<a href="http://interactjs.io/" target="_blank">Window Drag & Resize Behavior from: Interact.js</a>'));
            ul.appendChild(createLi('<a href="http://www.mattboldt.com/demos/typed-js/" target="_blank">Typing effect from: Typed.js</a>'));
            // terminal.append('\n');
            terminal.append(ul);
            // terminal.append('\n');
        }

        var terminal = $(".terminal");
        var prompt = "jakes-portfolio:";
        var path = "~";

        var commandHistory = [];
        var historyIndex = 0;

        var command = "";
        var commands = [{
            "name": "help",
            "function": help
        }, {
            "name": "clear",
            "function": clear
        }, {
            "name": "about-me",
            "function": about
        }, {
            "name": "my-work",
            "function": work
        }, {
            "name": "contact-me",
            "function": contact
        }, {
            "name": "credit",
            "function": credit
        }];

        function processCommand() {
            var isValid = false;

            // Create args list by splitting the command
            // by space characters and then shift off the
            // actual command.

            var args = command.split(" ");
            var cmd = args[0];
            args.shift();

            // Iterate through the available commands to find a match.
            // Then call that command and pass in any arguments.
            for (var i = 0; i < commands.length; i++) {
                if (cmd === commands[i].name) {
                    commands[i].function(args);
                    isValid = true;
                    break;
                }
            }

            // No match was found...
            if (!isValid) {
                terminal.append("user: command not found: " + command + "\n");
            }

            // Add to command history and clean up.
            commandHistory.push(command);
            historyIndex = commandHistory.length;
            command = "";
        }

        function displayPrompt() {
            terminal.append("<span class=\"prompt\">" + prompt + "</span> ");
            terminal.append("<span class=\"path\">" + path + "</span> ");
        }

// Delete n number of characters from the end of our output
        function erase(n) {
            command = command.slice(0, -n);
            terminal.html(terminal.html().slice(0, -n));
        }

        function clearCommand() {
            if (command.length > 0) {
                erase(command.length);
            }
        }

        function appendCommand(str) {
            terminal.append(str);
            command += str;
        }

        /*
            //	Keypress doesn't catch special keys,
            //	so we catch the backspace here and
            //	prevent it from navigating to the previous
            //	page. We also handle arrow keys for command history.
        */

        $(document).keydown(function(e) {
            e = e || window.event;
            var keyCode = typeof e.which === "number" ? e.which : e.keyCode;

            // BACKSPACE
            if (keyCode === 8 && e.target.tagName !== "INPUT" && e.target.tagName !== "TEXTAREA") {
                e.preventDefault();
                if (command !== "") {
                    erase(1);
                }
            }

            // UP or DOWN
            if (keyCode === 38 || keyCode === 40) {
                // Move up or down the history
                if (keyCode === 38) {
                    // UP
                    historyIndex--;
                    if (historyIndex < 0) {
                        historyIndex++;
                    }
                } else if (keyCode === 40) {
                    // DOWN
                    historyIndex++;
                    if (historyIndex > commandHistory.length - 1) {
                        historyIndex--;
                    }
                }

                // Get command
                var cmd = commandHistory[historyIndex];
                if (cmd !== undefined) {
                    clearCommand();
                    appendCommand(cmd);
                }
            }
        });

        $(document).keypress(function(e) {
            // Make sure we get the right event
            e = e || window.event;
            var keyCode = typeof e.which === "number" ? e.which : e.keyCode;

            // Which key was pressed?
            switch (keyCode) {
                // ENTER
                case 13:
                {
                    terminal.append("\n");

                    processCommand();
                    displayPrompt();
                    break;
                }
                default:
                {
                    appendCommand(String.fromCharCode(keyCode));
                }
            }
        });

// Set the window title
//         title.text("1. jake-schroeder-portfolio: ~ (user) ");

// Get the date for our fake last-login
//         var date = new Date().toString(); date = date.substr(0, date.indexOf("GMT") - 1);

// Display last-login and promt
//         terminal.append("Last login: " + date + " on ttys000\n"); displayPrompt();
        displayPrompt();

    }

    interact('.window')
        .draggable({
            onmove: dragMoveListener,
            allowFrom: '.heading',
        })
        .resizable({
            edges: { right: true, bottom: true, left: true, top: true },
            margin: 10
        })
        .on('resizemove', function (event) {
            var target = event.target,
                x = (parseFloat(target.getAttribute('data-x')) || 0),
                y = (parseFloat(target.getAttribute('data-y')) || 0);

            // update the element's style

                target.style.width  = event.rect.width + 'px';
                target.style.height = event.rect.height + 'px';


                var title = document.querySelector('.title');
                title.textContent = '1. jake-schroeder-portfolio: ~ (user) ' +  Math.round(event.rect.width) + '×' + Math.round(event.rect.height);


            // translate when resizing from top or left edges
            x += event.deltaRect.left;
            y += event.deltaRect.top;

            target.style.webkitTransform = target.style.transform =
                'translate(' + x + 'px,' + y + 'px)';

            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);


            // target.textContent = Math.round(event.rect.width) + '×' + Math.round(event.rect.height);
        });

    function dragMoveListener (event) {
        var target = event.target,
            // keep the dragged position in the data-x/data-y attributes
            x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
            y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

        // translate the element
        target.style.webkitTransform =
            target.style.transform =
                'translate(' + x + 'px, ' + y + 'px)';

        // update the posiion attributes
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
    }


    // var typed6 = new Typed('.terminal', {
    //     strings: [
    //         "Hi there, my name is Jake^1000\n",
    //         "this is my portfolio website15000\n",
    //         "Type \"Help\" to see a list of commands"
    //     ],
    //     typeSpeed: 30,
    //     backSpeed: 0,
    //     loop: false,
    //     showCursor: false,
    //     contentType: null,
    //     onComplete: function () {
    //         typed6.destroy();
    //         beginTerminal();
    //
    //     }
    // });

    var type1 = setTimeout(function(){
        var typed1 = new Typed('.element0-text', {
            strings: [" Hi there, my name is Jake"],
            typeSpeed: 30,
            backSpeed: 0,
            loop: false,
            showCursor: false,
            onComplete: function () {


            }
        });
    }, 0);
    var type2 = setTimeout(function(){
        $('.element1').css('display','inherit');
        var typed2 = new Typed('.element1-text', {
            strings: [" This is my portfolio website, I hope you enjoy :)"],
            typeSpeed: 30,
            backSpeed: 0,
            loop: false,
            showCursor: false,
            onComplete: function () {


            }
        });
    }, 3000);
    var type3 = setTimeout(function(){
        $('.element2').css('display','inherit');
        var typed3 = new Typed('.element2-text', {
            strings: [" Please type \"Help\" to see a list of commands^3000"],
            typeSpeed: 30,
            backSpeed: 0,
            loop: false,
            showCursor: false,
            onComplete: function () {
                // $('.terminal').empty();
                beginTerminal();
                $('.terminal').addClass('terminal-after');
            }
        });
    }, 7000);






});

