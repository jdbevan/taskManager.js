Requires
--------

`node` and `npm` and a web server to serve the webpage.

`npm install socket.io`


I also setup a virtualhost http://node/ in Apache to differentiate it from http://localhost/


What is it?
-----------

Uses [highcharts](http://highcharts.com) to plot live CPU and Memory usage obtained via WebSockets.

![screenshot](https://raw.github.com/jdbevan/taskManager.js/master/Screenshot.gif)


Bugs
----

The webpage appears to provide an increase of ~15% CPU usage on my machine (Windows 7 x64, Intel Core i3 M330 @ 2.13Ghz 4CPUs)... might need 
some Javascript optimization on those graphs...
