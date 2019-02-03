
# Bakery Tech Evaluation

 - Name: Adam Fakes
 - email: adam@datavi.co
 - phone: +61 (0)401-302-243 

## Summary
 - it's a "bin-packing" problem
 - [executable code](http://datavi.co/rubix/app.html)
 - [readable code](https://github.com/afakes/rubix-tech-eval/tree/master/code)
 - [requirements](https://github.com/afakes/rubix-tech-eval/blob/master/doc/bakery.pdf)

## Explanation of the bakery packing algorithm 
The Bakery packing problem, belongs the bin-packing family of algorithms. i.e. "how to select the smallest number of; (baskets, bins, items) to fulfil the total requested items". The goal of a good bin-packing algorithm is to achieve a result within low-order polynomial time, I attempt to achieve this through sorting, and logical subsets. 

### My Solution
If we accept that the number of pack configurations will be finite then we know the number of solutions, must be either finite, or unsolvable, this led me to think of it as a tree, with branches for calculation and nodes for decisions.
   
 1. The root node contains the original value 'requested number of items', 
 1. We create child nodes,  with each child node being assigned the value of one of pack sizes, until all pack sizes have been allocated. note we only create a child node for packs that are less than or equal to the 'number of items'  
 1. Perform an integer division at the node using the 'requested number of items' by the 'node value'. resulting in a count of packs, and a remaining 'number of items'
    1. if the integer division does not have a remainder, we record the node value (i.e. pack size) and the whole number
    1. a remainder of the division indicates we have not fulfilled the 'requested number of items'.  
        1. We now create a new set of child nodes, below the current node, similar to step [2].  
        1. perform the actions of [3], on this set of nodes.


![visual representation of algorithm](doc/images/diagrams.jpg?raw=true "visual representation of algorithm")

#### Pseudo code

  - **input**: _numberOfItems_

  - sort pack sizes for the item type in descending order 
  - extract the numberOfItems
  - loop through the pack sizes for the item type  
    - is numberOfItems a multiple of a single pack (division) with no remainder
      - YES ---> return the multiple as a count 
      - NO 
        -- we take the remainder of the division and test equal or smaller sized packs             
        -- repeat until remainder is zero or no solution can be found 

  - **output**: | pack of size |


## Steps to compile and run the code  

### online execution
To access and online version of the code access the following URL
 - URL: http://datavi.co/rubix/app.html 

### code - via GitHUB
To download the full code please clone the following repository on GitHUB 
 - https://github.com/afakes/rubix-tech-eval 

### zip archive  
To download the full code as a ZIP file, access the following URL
 - http://datavi.co/rubix/AdamFakes_rubix-tech-eval.zip 

## Test cases of the code
 
 - PASS - working solution with array input
 - PASS - working solution with string input
 - PASS - invalid input with number input
 - PASS - random working and invalid	lines
 - PASS - empty array
 - PASS - null input
 - PASS - no solution
 - PASS - empty string

Test execution is available at: http://datavi.co/rubix/code/tests.html 


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


## Decisions & Assumptions


### Assumptions
 - only solutions that provide whole number matching pack sizes will be accepted

### No Solution
If there was not complete solution, i.e. the number of request items could not be packed with the pack size configurations supplied, then the request was marked with "No Solution".
 - A solution this issue could be: increasingly add 1 to the number of items request until we find a solution, of course this would increase the cost price etc. leading to a new search domain, "what is the lowest cost for extra items ... "


### Language
_**ECMAScript6** (aka ES6, JavaScript, or NodeJS)_

For this test I have chosen to use ECMAScript6 (ES6) / HTML / CSS. A few of the factors that led to this decision; 
 - The ECMAScript6 functions & classes, can be ported directly to NodeJS, eseentially are NodeJS, excluding references to the Web Browser DOM, these have been kept to a minimum with using the a MVC pattern   
 - A single file exchanged with other users. Any internet user will already have a ES6 capable environment, i.e. the Web Browser. This environment additionally serves as the visualisation platform
 - Debugging within the browser is straight forward, with the JS console  

## references: 
 - Friesen, D. K.  (1986) Variable Sized Bin Packing  SIAM Journal on Computing 15:1, 222-230 
 - JOHNSON, S. (1967) NEAR-OPTIMAL BIN PACKING ALGORITHMS, Massachusetts Institute of Technology PhD Thesis access online 2019-02-03 https://dspace.mit.edu/bitstream/handle/1721.1/57819/17595570-MIT.pdf?sequence=2

