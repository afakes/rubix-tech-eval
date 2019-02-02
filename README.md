
# Bakery

## Solution to the Bakery packing problem. 
As the name implies this is a bin-packing problem, or "how to select the smallest number of; ()baskets, bins, items) to fulfil the total requested"   
 
### Search Tree
I have chosen to use a depth first search tree, where each node of the tree will be the pack-size and each edge will be the result containing the count of packs from the node and a remainder that will be passed on the the next node 


## Pseudo code
  
  - extract the numberOfItems
  - sort  pack sizes for the item type in descending order 
  - loop through the pack sizes for the item type  
    - is numberOfItems a multiple of a single pack  (division)
      - YES ---> return the multiple as a count
      - NO 
        -- we take the remainder od the division and test smaller sized packs             
        -- repeat until remainder is zero  or no solution can be found 


### Language

**ECMAScript6**

For this test I have chosen to use ECMAScript6 (ES6) / HTML / CSS. A few of the factors that led to this decision; 
 - The ECMAScript6 functions, can be ported directly to NodeJS, excluding references to the Web Browser DOM, these have been kept to a minimum with a MVC style approach.   
 - Easy to pass on to other users. Any internet user will already have an ES6 capable environment, e.g. the Web Browser. This environment serves the user well as a visualisation platform
 - Debugging within the browser is straight forward, with the JS console  


## Tests

### Test sets 
 - standard - the supplied tests
 - string   - the supplied tests in a string format
 - number   - to check error handling 
 - random   - a mix of good and bad inputs to test error handling and process
 - empty    - empty data. 


## Data 
The data format, structure and order are important. Here I have restructured the data to allow for efficient access.  
By denormalising the item code and name, we can save on storage space, search time, and indexing (depending on the backend storage solution) 
 
### Original 

|  Name                | Code | Packs      |
| -------------------- | ---- | ---------- | 
| **Vegemite Scroll**  | VS5  | 3 @ $ 6.99 | 
|                      |      | 5 @ $ 8.99 |
|                      |      |            |
| **Blueberry Muffin** | MB11 | 2 @ $ 9.95 |  
|                      |      | 5 @ $16.95 |  
|                      |      | 8 @ $24.95 | 
|                      |      |            |
| **Croissant**        | CF   | 3 @ $ 5.95 |  
|                      |      | 5 @ $ 9.95 |  
|                      |      | 9 @ $16.99 | 
|                      |      |            |

### table format 

| key   |  Name                | Code | pack_size  | price |
| ----- | -------------------- | ---- | ---------- | ----- | 
| VS5_3 | Vegemite Scroll      | VS5  | 3          |  6.99 | 
| VS5_5 | Vegemite Scroll      | VS5  | 5          |  8.99 |
| MB11_2| Blueberry Muffin     | MB11 | 2          |  9.95 |  
| MB11_5| Blueberry Muffin     | MB11 | 5          | 16.95 |  
| MB11_8| Blueberry Muffin     | MB11 | 8          | 24.95 | 
| CF_3  | Croissant            | CF   | 3          |  5.95 |  
| CF_5  | Croissant            | CF   | 5          |  9.95 |  
| CF_9  | Croissant            | CF   | 9          | 16.99 | 


```json
{
    "name": {
      "VS5":  "Vegemite Scroll",
      "MB11": "Blueberry Muffin",
      "CF":   "Croissant" 
    },
    "products": {
      "VS5": {
        "5": 8.99,
        "3": 6.99
      },
      "MB11": {
        "8": 24.95,
        "5": 16.95,
        "2": 9.95
      },
      "CF": {
        "9": 16.99,
        "5": 9.95,
        "3": 5.95
      }
    }
}
```


references: 
 D. K. Friesen and M. A. Langston. (1986) Variable Sized Bin Packing  SIAM Journal on Computing 15:1, 222-230 

