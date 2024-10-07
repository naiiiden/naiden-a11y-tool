# naiden-a11y-tool
visual stuff and side panel ui: <br>
green = helpful and possible improvement, yellow = alert to that should be looked at, red = error to be fixed asap <br>
all elements should be outlined with one of the colors above depending on their state <br>
~toggleable stylesheets~ <br>
text indicator of each feature and structural element, error, alert and aria attr <br>
explain what each error means, how to fix it and related wcag link about the issue <br>

## errors:
### alt attr:
4. image map area missing alt text
`
<img src="workplace.jpg" usemap="#workmap">
`
5. image map missing alt text
`
<map name="workmap">
  <area shape="rect" coords="34,44,270,350" href="computer.htm">
  <area shape="rect" coords="290,172,333,250" href="phone.htm">
  <area shape="circle" coords="337,300,44" href="coffee.htm">
</map>
`

### forms:
1. missing form label
2. empty form label
3. multiple form labels

### empty stuff:
1. empty heading (img w/ no alt attr)
4. empty table header
6. empty iframe title