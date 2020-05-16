# svg-generator

Create an svg image with a color gradient and repeating shape.


## __installation__


Install globally to use anywhere to use via CLI.

```
npm install --global svg-generator
```


Or use it as a local, node installation:

```
npm install --save svg-generator
```


## __usage__

CLI 
```
svg-generator --start <hex-string> --end <hex-string> -w <width> --noise <noise> 
```

Node
```
import svgGenerator from 'svg-generator';

svgGenerator({start: hexColor, end: '#ff0000}, <width default=8>, <number of cycles>);
```

For more details on input parameters:

```
svg-generator --help
```
## __example__

### CLI example

The following input will generate an svg.

```
$ svg-generator --start '#ffbb00' -w 400 --end '#222222' -n 0
```

An example screenshot of the svg 

![svg image screenshot](./assets/output.png)

