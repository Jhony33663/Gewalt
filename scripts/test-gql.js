fetch('http://localhost:8000/graphql/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query: `query {
      products(first: 10, channel: "default-channel") {
        edges {
          node {
            id
            name
            slug
            variants {
              id
              name
              sku
              quantityAvailable
              attributes {
                attribute { name slug }
                values { name slug }
              }
              stocks {
                quantity
                warehouse { name }
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
