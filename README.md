# markdown-to-slack

> aka `md2slack`
> Command line utility that converts markdown to slack on stdin/stdout

## Usage

md2slack takes any input from stdin and spits out slack syntax to stdout

e.g:

### Basic example

```shell
echo "I love [md2slack](https://github.com/rbutera/markdown-to-slack)" | md2slack
```

### Outputting to macOS Clipboard

```shell
echo "I love [md2slack](https://github.com/rbutera/markdown-to-slack)" | md2slack | pbcopy
```

### Taking clipboard contents and converting

```shell
pbpaste | md2slack | pbcopy
```
