# 18 days


### Converting

#### csv to json

csv to json:  http://www.csvjson.com/csv2json

To convert to new json format, we use http://elteneen.github.io/ReViz/convertdata.html

To get the new data, copy it from the web console 

```
copy(days)
```

Example of output json: http://elteneen.github.io/ReViz/data/18days.js

#### Data Structure 

The JSON is an array of days. Each day has two elements: a date and corresponding persons.
```
 day = 
 {
    "date": [ day, month, year ],
    "persons":[p1, p2, p3, ..., pLast]
  } 
```

Each person ( p ) is an array of 14 elements.

```
   p[0] = name
   p[1] = photo

   p[2] = location 
   p[3] = how s/he died
   p[4] = job
   p[5] = age
   p[6] = social status
   p[7] = birthday 

   p[8] = profile link
   p[9] = video link
   p[10] = news link

   p[11] = report link1 
   p[12] = report link2 
   p[13] = case number 
```

### Visualization 

We use the Processing into Javascript library [p5js](http://p5js.org/) to control animation and sound and we use its [DOM](http://p5js.org/reference/#/libraries/p5.dom) extension to maniuplate HTML elements.   

The full p5js sketch is at http://elteneen.github.io/ReViz/viz.js



