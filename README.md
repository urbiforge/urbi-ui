# Urbi UI

Urbi UI is a native urbiscript client capable of displaying widgets to graph,
monitor and edit urbiscript variables.

## Installing

Either get a binary release, or run from source:

- Clone the repository and cd into the urbiui subdirectory.
- `npm install`
- `npm start`

## Usage

### Connecting to an Urbi server

Simply type the host:port to connect to in the command text field and hit
enter. You can ommit the ":port" part, it will default to 54000.

### Sending commands

Type your Urbiscript commands in the command text field and hit return to send
(don't forget the ';' separator).

You can also type longuer pieces of code in the right textarea and hit the
"Send" button.

### History

Use the up and down arrow to browse your command history. Hit alt-R for a
reverse-search.

### Widget commands

Widget are created by typing special commands prefixed with a '#'.

- "#graph EXPR" will poll EXPR and graph it using a line chart.
- "#show EXPR" will poll and show the current value of EXPR.
- "#edit EXPR" will show and allow you to edit (if it's a lvalue) EXPR.
- "#slider MIN MAX EXPR" will show and edit using a slider with given bounds.
- "#button label code" will create a button that will send CODE when clicked.

Buttons can also be created using code in the text area by using "To button"
### Widget grouping

You can prefix a command by "#in GNAME " and it will group the widgets in a
parent component, creating it if necessary.

### Saving and loading

You can save the state by typing "#save filebase", you will be prompted to save
"filebase.json" on your hard drive.

You can later on reload a state by hitting the bottom-right "choose file" button.

#### Prelude

You can define a prelude Urbiscript code to send when a state is loaded.
Type it in the text area and hit "save prelude" before saving.


### Injecting widgets from Urbiscript

The connected Urbiscript client listens on the 'command' channel for commands.
You can then create new widgets from code using for instance:

    Channel.new("command") << "#graph x";