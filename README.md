# 404
404 page for [luke.deentaylor.com](http://luke.deentaylor.com/). See it in action [here](http://luke.deentaylor.com/404/).

**Please note** that as I come up with new ideas, I might change the contents of this repo completely to reflect what I'm currently using. The version history will still be here, though :)

## Issues
This is horribly inefficient, and mobile devices suffer from that.

The current implementation involves moving each element individually, but a possible optimization could be to create 10 "layer" divs, since there are only 10 possible movement speeds. However, all text nodes would still need to be iterated through to retire nodes which have moved beyond the bounds of the screen.

I could also try moving to a `<canvas>`-based implementaiton, which might prove more efficient.

## Plans

- I might redo this to look like [a 3D starfield](http://codentronix.com/2011/05/28/3d-starfield-made-using-python-and-pygame/), replacing the stars with "404" text.
- I might have the text fall down instead of up
- I might change the whole thing completely
