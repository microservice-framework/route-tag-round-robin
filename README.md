# route-tag-round-robin
Provide tag "round-robin". Easy to use tag that vote to route traffic to next tagged as a round-robin

Example config: 
```
{
  tag: "round-robin",
  config: {
    voteSize: 1000,
  },
  handler: "route-tag-round-robin"
}
```
