# naiden-a11y-tool
visual stuff and side panel ui: <br>
green = helpful and possible improvement, yellow = alert to that should be looked at, red = error to be fixed asap <br>
all elements should be outlined with one of the colors above depending on their state <br>
~toggleable stylesheets~

## errors:
### alt attr:
1. img missing alt attribute
2. linked img missing alt text (empty link)
3. image button missing alt text (empty button)
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
2. empty button (img w/ no alt attr)
3. empty link (img w/ no alt attr)
4. empty table header