# Chapter 1: What is Scope?
## Compiler Theory

* **Compilation** describes what happens before code is executed; it must be processed before being executed.
* In a traditional compiled-language process, code will go through **three steps before it's execute**
  1. **Tokenizing/Lexing** - breaking up the code into chunks, called **tokens**
     * Ex.   
         **var a = 2;**   
            This program would likely be broken up into the following tokens: var, a, =, 2, and ;
     * **Lexing** is more of a CS/academic concept but on a high level, is different than tokenizing if parsing rules were invoked to decide whether **a** was a unique token or part of another token  

  1. **Parsing** - taking a stream (array) of tokens and turning (parsing) them into a tree of nested elements. The tree is known as a **AST** (**A**bstract **S**yntax **T**ree) 
     * The tree for var a = 2; might start with a top-level node called **VariableDeclaration**, with a child node called **Identifier** (whose value is a), and another child called **AssignmentExpression** which itself has a child called **NumericLiteral** (whose value is 2) 

  1. **Code-Generation** - the process of taking the tree (AST) and turning it into code that can be executed


## Scope
* Think of scope in terms of a conversation
  * **Engine** - responsible for compilation and execution of code/program

  * **Compiler** - handles parsing and code-generation

  * **Scope** - collects and maintains a searchable list of all variables and a strict list of rules as how those variables are accessed to code that's being executed

* For the previous example, ( var a = 2 ), the interaction between the three particpants it the scope conversation would be:
  1. **Compiler** declares "a" as a variable, if it has not already been declared
  1. **Engine** (when executing) looks up the variable "a" in **Scope** and assigns the value "2" 


### Compiler terminology
* When the **engine** executes the code produced by the **compiler** it has to look-up the value of "a" and then assign the value of 2, if it is not already defined. 
* When it does this, there are two things going on: 
  1. The first is what's known as an RHS reference or (Right-hand side). It is best thought of as "the source of the assignment". The source in this case is "a", so the RHS is saying, "go get/check the value of a". 
  1. The second is a LHS (left-hand side) reference. It can be thought of as "who's the target of the assignment".   
     * So,  **var a=2**, is a LHS reference because it doesn't care about what "a" currently is, it's just looking for the variable "a" as a target for the "=2" assignment operation. 

### Nested Scope
* Multiple scopes can and often do exist within one another
* If a variable or assignment can't be found with an RHS look-up in the current scope, it will go up a level until (eventually Global Scope) it finds the variable/assignment
  * 
* Conversely, in an LHS look-up, if a varible isn't found the program is **NOT running strictmode**, a new global variable will be created. 








