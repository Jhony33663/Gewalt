fetch('http://localhost:8000/graphql/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query: `query {
      products(first: 10, channel: "default-channel") {
        edges {
          node {
            name
            slug
            variants {
              id
              name
              attributes {
                attribute { name }
                values { name }
              }
            }
          }
        }
      }
    }`
  })
})
.then(res => res.json())
.then(data => console.log(JSON.stringify(data, null, 2)))
.catch(console.error);
