import React, { useState } from "react";

const programs = [
  {
    id: 1,
    title:
      "Menu-Driven Program to Search Roll Numbers Using Linear and Binary Search",
    code: String.raw`#include <stdio.h>

#define MAX 100

int linearSearch(int arr[], int n, int key) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == key)
            return i;
    }
    return -1;
}

int binarySearch(int arr[], int n, int key) {
    int low = 0, high = n - 1;

    while (low <= high) {
        int mid = low + (high - low) / 2;

        if (arr[mid] == key)
            return mid;
        else if (arr[mid] < key)
            low = mid + 1;
        else
            high = mid - 1;
    }

    return -1;
}

void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

int main(void) {
    int arr[MAX], n, key, choice, result;

    printf("Enter the number of elements: ");
    if (scanf("%d", &n) != 1 || n < 1 || n > MAX) {
        printf("Invalid number of elements.\n");
        return 1;
    }

    printf("Enter the roll numbers:\n");
    for (int i = 0; i < n; i++)
        scanf("%d", &arr[i]);

    do {
        printf("\n===== MENU =====\n");
        printf("1. Linear Search\n");
        printf("2. Binary Search\n");
        printf("3. Exit\n");
        printf("Enter your choice: ");
        scanf("%d", &choice);

        switch (choice) {
            case 1:
                printf("Enter roll number to search: ");
                scanf("%d", &key);

                result = linearSearch(arr, n, key);

                if (result != -1)
                    printf("Roll number found at index %d.\n", result);
                else
                    printf("Roll number not found.\n");
                break;

            case 2:
                bubbleSort(arr, n);

                printf("Sorted array: ");
                for (int i = 0; i < n; i++)
                    printf("%d ", arr[i]);

                printf("\nEnter roll number to search: ");
                scanf("%d", &key);

                result = binarySearch(arr, n, key);

                if (result != -1)
                    printf("Roll number found at index %d in the sorted array.\n", result);
                else
                    printf("Roll number not found.\n");
                break;

            case 3:
                printf("Exiting program...\n");
                break;

            default:
                printf("Invalid choice. Please try again.\n");
        }
    } while (choice != 3);

    return 0;
}`,
  },
  {
    id: 2,
    title: "Menu-Driven Program to Implement Bubble Sort and Selection Sort",
    code: String.raw`#include <stdio.h>

#define MAX 100

void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int swapped = 0;

        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = 1;
            }
        }

        if (!swapped)
            break;
    }
}

void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int minIndex = i;

        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex])
                minIndex = j;
        }

        int temp = arr[minIndex];
        arr[minIndex] = arr[i];
        arr[i] = temp;
    }
}

int main(void) {
    int choice, arr[MAX], n;

    do {
        printf("\n===== SORTING MENU =====\n");
        printf("1. Bubble Sort\n");
        printf("2. Selection Sort\n");
        printf("3. Exit\n");
        printf("Enter your choice: ");
        scanf("%d", &choice);

        if (choice == 1 || choice == 2) {
            printf("Enter array size (1-%d): ", MAX);
            scanf("%d", &n);

            if (n < 1 || n > MAX) {
                printf("Invalid array size.\n");
                continue;
            }

            printf("Enter array elements:\n");
            for (int i = 0; i < n; i++)
                scanf("%d", &arr[i]);

            if (choice == 1) {
                bubbleSort(arr, n);
                printf("Bubble Sort Result: ");
            } else {
                selectionSort(arr, n);
                printf("Selection Sort Result: ");
            }

            for (int i = 0; i < n; i++)
                printf("%d ", arr[i]);

            printf("\n");
        } else if (choice == 3) {
            printf("Exiting program.\n");
        } else {
            printf("Invalid choice.\n");
        }
    } while (choice != 3);

    return 0;
}`,
  },
  {
    id: 3,
    title:
      "Implementation of a Hash Table-Based Telephone Directory Using Collision Resolution",
    code: String.raw`#include <stdio.h>

#define SIZE 10

int linear[SIZE], quadratic[SIZE], doubleHash[SIZE];

void initialize(void) {
    for (int i = 0; i < SIZE; i++)
        linear[i] = quadratic[i] = doubleHash[i] = -1;
}

void display(int table[]) {
    printf("\nIndex : Key\n");

    for (int i = 0; i < SIZE; i++) {
        if (table[i] == -1)
            printf("%d : Empty\n", i);
        else
            printf("%d : %d\n", i, table[i]);
    }
}

void insertKey(int table[], int key, int method) {
    if (key < 0) {
        printf("Enter a non-negative key.\n");
        return;
    }

    int h = key % SIZE;
    int step = 7 - key % 7;

    for (int i = 0; i < SIZE; i++) {
        int position;

        if (method == 1)
            position = (h + i) % SIZE;
        else if (method == 2)
            position = (h + i * i) % SIZE;
        else
            position = (h + i * step) % SIZE;

        if (table[position] == key) {
            printf("Key already exists at index %d.\n", position);
            return;
        }

        if (table[position] == -1) {
            table[position] = key;
            printf("Inserted at index %d.\n", position);
            return;
        }
    }

    printf("No available slot found. Table may be full.\n");
}

int main(void) {
    int choice, operation, key;
    int *table;

    initialize();

    do {
        printf("\n===== HASH TABLE MENU =====\n");
        printf("1. Linear Probing\n");
        printf("2. Quadratic Probing\n");
        printf("3. Double Hashing\n");
        printf("4. Exit\n");
        printf("Enter choice: ");
        scanf("%d", &choice);

        if (choice == 4)
            break;

        if (choice < 1 || choice > 3) {
            printf("Invalid choice.\n");
            continue;
        }

        table = (choice == 1) ? linear :
                (choice == 2) ? quadratic : doubleHash;

        do {
            printf("\n1. Insert\n");
            printf("2. Display\n");
            printf("3. Back\n");
            printf("Enter choice: ");
            scanf("%d", &operation);

            if (operation == 1) {
                printf("Enter key: ");
                scanf("%d", &key);
                insertKey(table, key, choice);
            } else if (operation == 2) {
                display(table);
            } else if (operation != 3) {
                printf("Invalid choice.\n");
            }
        } while (operation != 3);

    } while (choice != 4);

    return 0;
}`,
  },
  {
    id: 4,
    title: "Club Member Management Using a Singly Linked List",
    code: String.raw`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct Node {
    int prn;
    char name[50];
    struct Node *next;
};

struct Node *createNode(int prn, const char *name) {
    struct Node *newNode = malloc(sizeof(struct Node));

    if (newNode == NULL) {
        printf("Memory allocation failed.\n");
        exit(1);
    }

    newNode->prn = prn;
    snprintf(newNode->name, sizeof(newNode->name), "%s", name);
    newNode->next = NULL;

    return newNode;
}

struct Node *addPresident(struct Node *head, int prn, const char *name) {
    struct Node *newNode = createNode(prn, name);
    newNode->next = head;
    return newNode;
}

struct Node *addSecretary(struct Node *head, int prn, const char *name) {
    struct Node *newNode = createNode(prn, name);

    if (head == NULL)
        return newNode;

    struct Node *temp = head;

    while (temp->next != NULL)
        temp = temp->next;

    temp->next = newNode;
    return head;
}

struct Node *addMember(struct Node *head, int prn, const char *name) {
    if (head == NULL || head->next == NULL) {
        printf("Add the President and Secretary first.\n");
        return head;
    }

    struct Node *newNode = createNode(prn, name);
    struct Node *temp = head;

    while (temp->next->next != NULL)
        temp = temp->next;

    newNode->next = temp->next;
    temp->next = newNode;

    return head;
}

void displayList(struct Node *head) {
    if (head == NULL) {
        printf("The list is empty.\n");
        return;
    }

    printf("President is first and Secretary is last.\n");
    printf("PRN\tName\n");

    while (head != NULL) {
        printf("%d\t%s\n", head->prn, head->name);
        head = head->next;
    }
}

void countMembers(struct Node *head) {
    int count = 0;

    while (head != NULL) {
        count++;
        head = head->next;
    }

    printf("Total members: %d\n", count);
}

struct Node *deletePresident(struct Node *head) {
    if (head == NULL) {
        printf("List is empty.\n");
        return NULL;
    }

    struct Node *temp = head;
    head = head->next;
    free(temp);

    return head;
}

struct Node *deleteSecretary(struct Node *head) {
    if (head == NULL || head->next == NULL) {
        printf("A Secretary cannot be deleted from this list.\n");
        return head;
    }

    struct Node *temp = head;

    while (temp->next->next != NULL)
        temp = temp->next;

    free(temp->next);
    temp->next = NULL;

    return head;
}

struct Node *deleteMember(struct Node *head, int prn) {
    struct Node *temp = head;
    struct Node *prev = NULL;

    while (temp != NULL && temp->prn != prn) {
        prev = temp;
        temp = temp->next;
    }

    if (temp == NULL) {
        printf("Member with PRN %d not found.\n", prn);
        return head;
    }

    if (prev == NULL)
        head = temp->next;
    else
        prev->next = temp->next;

    free(temp);
    return head;
}

void freeList(struct Node *head) {
    while (head != NULL) {
        struct Node *temp = head;
        head = head->next;
        free(temp);
    }
}

int main(void) {
    struct Node *head = NULL;
    int choice, prn, again;
    char name[50];

    do {
        printf("\n===== CLUB MEMBER MENU =====\n");
        printf("1. Add President\n");
        printf("2. Add Secretary\n");
        printf("3. Add Member\n");
        printf("4. Delete President\n");
        printf("5. Delete Secretary\n");
        printf("6. Delete Member\n");
        printf("7. Display List\n");
        printf("8. Count Members\n");
        printf("Enter your choice: ");
        scanf("%d", &choice);

        switch (choice) {
            case 1:
            case 2:
            case 3:
                printf("Enter PRN: ");
                scanf("%d", &prn);
                printf("Enter Name (one word): ");
                scanf("%49s", name);

                if (choice == 1)
                    head = addPresident(head, prn, name);
                else if (choice == 2)
                    head = addSecretary(head, prn, name);
                else
                    head = addMember(head, prn, name);
                break;

            case 4:
                head = deletePresident(head);
                break;

            case 5:
                head = deleteSecretary(head);
                break;

            case 6:
                printf("Enter PRN to delete: ");
                scanf("%d", &prn);
                head = deleteMember(head, prn);
                break;

            case 7:
                displayList(head);
                break;

            case 8:
                countMembers(head);
                break;

            default:
                printf("Invalid choice.\n");
        }

        printf("Continue? (1 = Yes, 0 = No): ");
        scanf("%d", &again);

    } while (again == 1);

    displayList(head);
    freeList(head);

    return 0;
}`,
  },
  {
    id: 5,
    title: "Cinemax Theater Ticket Booking Using a Doubly Linked List",
    code: String.raw`#include <stdio.h>
#include <stdlib.h>

#define ROWS 10
#define SEATS 10

struct Seat {
    int seat_num;
    int status;
    struct Seat *next;
    struct Seat *prev;
};

struct Seat *row_heads[ROWS];

struct Seat *createSeat(int seat_num) {
    struct Seat *newSeat = malloc(sizeof(struct Seat));

    if (newSeat == NULL) {
        printf("Memory allocation failed.\n");
        exit(1);
    }

    newSeat->seat_num = seat_num;
    newSeat->status = -1;
    newSeat->next = NULL;
    newSeat->prev = NULL;

    return newSeat;
}

void createRows(void) {
    for (int i = 0; i < ROWS; i++) {
        struct Seat *head = NULL;
        struct Seat *prev = NULL;

        for (int j = 1; j <= SEATS; j++) {
            struct Seat *newSeat = createSeat(j);

            if (head == NULL)
                head = newSeat;
            else {
                prev->next = newSeat;
                newSeat->prev = prev;
            }

            prev = newSeat;
        }

        row_heads[i] = head;
    }
}

struct Seat *findSeat(int row, int seat_num) {
    if (row < 1 || row > ROWS ||
        seat_num < 1 || seat_num > SEATS) {
        printf("Invalid row or seat number.\n");
        return NULL;
    }

    struct Seat *temp = row_heads[row - 1];

    while (temp != NULL && temp->seat_num != seat_num)
        temp = temp->next;

    return temp;
}

void displaySeats(void) {
    printf("\nSeat Layout ([ ] Available, [X] Booked)\n");

    for (int i = 0; i < ROWS; i++) {
        struct Seat *temp = row_heads[i];
        printf("Row %2d: ", i + 1);

        while (temp != NULL) {
            printf(temp->status == 1 ? "[X] " : "[ ] ");
            temp = temp->next;
        }

        printf("\n");
    }
}

void bookSeat(int row, int seat_num) {
    struct Seat *seat = findSeat(row, seat_num);

    if (seat == NULL)
        return;

    if (seat->status == 1)
        printf("Seat is already booked.\n");
    else {
        seat->status = 1;
        printf("Seat booked successfully.\n");
    }
}

void deleteSeat(int row, int seat_num) {
    struct Seat *seat = findSeat(row, seat_num);

    if (seat == NULL)
        return;

    if (seat->status == -1)
        printf("Seat is already available.\n");
    else {
        seat->status = -1;
        printf("Booking cancelled successfully.\n");
    }
}

void freeRows(void) {
    for (int i = 0; i < ROWS; i++) {
        struct Seat *temp = row_heads[i];

        while (temp != NULL) {
            struct Seat *next = temp->next;
            free(temp);
            temp = next;
        }

        row_heads[i] = NULL;
    }
}

int main(void) {
    int choice, row, seat;
    createRows();

    do {
        printf("\n===== CINEMAX MENU =====\n");
        printf("1. Book Seat\n");
        printf("2. Delete Seat Booking\n");
        printf("3. Display Seats\n");
        printf("4. Exit\n");
        printf("Enter choice: ");
        scanf("%d", &choice);

        switch (choice) {
            case 1:
            case 2:
                printf("Enter row number (1-%d): ", ROWS);
                scanf("%d", &row);
                printf("Enter seat number (1-%d): ", SEATS);
                scanf("%d", &seat);

                if (choice == 1)
                    bookSeat(row, seat);
                else
                    deleteSeat(row, seat);
                break;

            case 3:
                displaySeats();
                break;

            case 4:
                printf("Exiting program.\n");
                break;

            default:
                printf("Invalid choice.\n");
        }
    } while (choice != 4);

    freeRows();
    return 0;
}`,
  },
  {
    id: 6,
    title: "Infix to Postfix Expression Conversion Using a Stack",
    code: String.raw`#include <stdio.h>
#include <ctype.h>

#define MAX 100

struct Stack {
    int top;
    char items[MAX];
};

void initStack(struct Stack *s) {
    s->top = -1;
}

int isEmpty(struct Stack *s) {
    return s->top == -1;
}

int isFull(struct Stack *s) {
    return s->top == MAX - 1;
}

void push(struct Stack *s, char value) {
    if (!isFull(s))
        s->items[++s->top] = value;
}

char pop(struct Stack *s) {
    if (isEmpty(s))
        return '\0';

    return s->items[s->top--];
}

char peek(struct Stack *s) {
    if (isEmpty(s))
        return '\0';

    return s->items[s->top];
}

int getPrecedence(char ch) {
    switch (ch) {
        case '^':
            return 3;
        case '*':
        case '/':
        case '%':
            return 2;
        case '+':
        case '-':
            return 1;
        default:
            return 0;
    }
}

int isRightAssociative(char ch) {
    return ch == '^';
}

void infixToPostfix(char infix[], char postfix[]) {
    struct Stack s;
    initStack(&s);

    int i = 0, k = 0;

    while (infix[i] != '\0') {
        char ch = infix[i++];

        if (isspace((unsigned char)ch))
            continue;

        if (isalnum((unsigned char)ch)) {
            postfix[k++] = ch;
        } else if (ch == '(') {
            push(&s, ch);
        } else if (ch == ')') {
            while (!isEmpty(&s) && peek(&s) != '(')
                postfix[k++] = pop(&s);

            if (!isEmpty(&s) && peek(&s) == '(')
                pop(&s);
        } else if (getPrecedence(ch) > 0) {
            while (!isEmpty(&s) && peek(&s) != '(' &&
                   (getPrecedence(peek(&s)) > getPrecedence(ch) ||
                   (getPrecedence(peek(&s)) == getPrecedence(ch) &&
                    !isRightAssociative(ch)))) {
                postfix[k++] = pop(&s);
            }

            push(&s, ch);
        }
    }

    while (!isEmpty(&s))
        postfix[k++] = pop(&s);

    postfix[k] = '\0';
}

int main(void) {
    char infix[] = "a+b*(c^d-e)^(f+g*h)-i";
    char postfix[MAX];

    infixToPostfix(infix, postfix);

    printf("Infix Expression: %s\n", infix);
    printf("Postfix Expression: %s\n", postfix);

    return 0;
}`,
  },
  {
    id: 7,
    title: "Simulation of a Pizza Parlor Job Queue Using a Queue",
    code: String.raw`#include <stdio.h>

#define MAX 100

int queue[MAX];
int front = -1, rear = -1;

void orderPizza(int value) {
    if (front == (rear + 1) % MAX) {
        printf("Queue is full.\n");
        return;
    }

    if (front == -1)
        front = rear = 0;
    else
        rear = (rear + 1) % MAX;

    queue[rear] = value;
    printf("Order added successfully.\n");
}

void processOrder(void) {
    if (front == -1) {
        printf("Queue is empty.\n");
        return;
    }

    printf("Processing order quantity: %d\n", queue[front]);

    if (front == rear)
        front = rear = -1;
    else
        front = (front + 1) % MAX;
}

void displayOrders(void) {
    if (front == -1) {
        printf("Queue is empty.\n");
        return;
    }

    printf("Pizza Orders: ");

    int i = front;

    while (1) {
        printf("%d ", queue[i]);

        if (i == rear)
            break;

        i = (i + 1) % MAX;
    }

    printf("\n");
}

int main(void) {
    int choice, value;

    do {
        printf("\n===== PIZZA PARLOR MENU =====\n");
        printf("1. Order Pizza\n");
        printf("2. Process Order\n");
        printf("3. Display Orders\n");
        printf("4. Exit\n");
        printf("Enter your choice: ");
        scanf("%d", &choice);

        switch (choice) {
            case 1:
                printf("Enter order quantity: ");
                scanf("%d", &value);
                orderPizza(value);
                break;

            case 2:
                processOrder();
                break;

            case 3:
                displayOrders();
                break;

            case 4:
                printf("Exiting program...\n");
                break;

            default:
                printf("Invalid choice. Please try again.\n");
        }
    } while (choice != 4);

    return 0;
}`,
  },
  {
    id: 8,
    title:
      "Binary Search Tree: Insertion, Searching, Minimum, Height and Mirror Image",
    code: String.raw`#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node *left;
    struct Node *right;
};

struct Node *createNode(int value) {
    struct Node *newNode = malloc(sizeof(struct Node));

    if (newNode == NULL) {
        printf("Memory allocation failed.\n");
        exit(1);
    }

    newNode->data = value;
    newNode->left = NULL;
    newNode->right = NULL;

    return newNode;
}

struct Node *insert(struct Node *root, int value) {
    if (root == NULL)
        return createNode(value);

    if (value < root->data)
        root->left = insert(root->left, value);
    else if (value > root->data)
        root->right = insert(root->right, value);
    else
        printf("Duplicate value ignored.\n");

    return root;
}

void inorder(struct Node *root) {
    if (root != NULL) {
        inorder(root->left);
        printf("%d ", root->data);
        inorder(root->right);
    }
}

void findMinimum(struct Node *root, int *minimum) {
    if (root == NULL)
        return;

    if (root->data < *minimum)
        *minimum = root->data;

    findMinimum(root->left, minimum);
    findMinimum(root->right, minimum);
}

int calculateHeight(struct Node *root) {
    if (root == NULL)
        return 0;

    int leftHeight = calculateHeight(root->left);
    int rightHeight = calculateHeight(root->right);

    return 1 + (leftHeight > rightHeight ? leftHeight : rightHeight);
}

void mirrorTree(struct Node *root) {
    if (root == NULL)
        return;

    struct Node *temp = root->left;
    root->left = root->right;
    root->right = temp;

    mirrorTree(root->left);
    mirrorTree(root->right);
}

int search(struct Node *root, int key) {
    if (root == NULL)
        return 0;

    if (root->data == key)
        return 1;

    return search(root->left, key) || search(root->right, key);
}

void freeTree(struct Node *root) {
    if (root != NULL) {
        freeTree(root->left);
        freeTree(root->right);
        free(root);
    }
}

int main(void) {
    struct Node *root = NULL;
    int choice, value, minimum;

    do {
        printf("\n===== BINARY SEARCH TREE MENU =====\n");
        printf("1. Insert Node\n");
        printf("2. Display Tree (Inorder)\n");
        printf("3. Find Minimum Value\n");
        printf("4. Find Height of Tree\n");
        printf("5. Mirror the Tree\n");
        printf("6. Search a Value\n");
        printf("7. Exit\n");
        printf("Enter choice: ");
        scanf("%d", &choice);

        switch (choice) {
            case 1:
                printf("Enter value to insert: ");
                scanf("%d", &value);
                root = insert(root, value);
                break;

            case 2:
                if (root == NULL)
                    printf("Tree is empty.\n");
                else {
                    printf("Inorder Traversal: ");
                    inorder(root);
                    printf("\n");
                }
                break;

            case 3:
                if (root == NULL) {
                    printf("Tree is empty.\n");
                } else {
                    minimum = root->data;
                    findMinimum(root, &minimum);
                    printf("Minimum value: %d\n", minimum);
                }
                break;

            case 4:
                printf("Height of Tree: %d\n", calculateHeight(root));
                break;

            case 5:
                mirrorTree(root);
                printf("Tree mirrored successfully.\n");
                printf("New Inorder Traversal: ");
                inorder(root);
                printf("\n");
                break;

            case 6:
                printf("Enter value to search: ");
                scanf("%d", &value);

                if (search(root, value))
                    printf("Value found in the tree.\n");
                else
                    printf("Value not found in the tree.\n");
                break;

            case 7:
                printf("Exiting program...\n");
                break;

            default:
                printf("Invalid choice. Enter 1-7.\n");
        }
    } while (choice != 7);

    freeTree(root);
    return 0;
}`,
  },
  {
    id: 9,
    title:
      "Representing Flight Paths and Costs Using a Graph and Checking Connectivity with DFS",
    code: String.raw`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_CITIES 10

struct Node {
    int cityIndex;
    int cost;
    struct Node *next;
};

char cityNames[MAX_CITIES][50];
struct Node *adjList[MAX_CITIES];
int numCities = 0;
int visited[MAX_CITIES];

int getCityIndex(char name[]) {
    for (int i = 0; i < numCities; i++) {
        if (strcmp(cityNames[i], name) == 0)
            return i;
    }

    return -1;
}

void freeGraph(void) {
    for (int i = 0; i < MAX_CITIES; i++) {
        struct Node *temp = adjList[i];

        while (temp != NULL) {
            struct Node *next = temp->next;
            free(temp);
            temp = next;
        }

        adjList[i] = NULL;
    }
}

void addFlight(int src, int dest, int cost) {
    struct Node *first = malloc(sizeof(struct Node));
    struct Node *second = malloc(sizeof(struct Node));

    if (first == NULL || second == NULL) {
        printf("Memory allocation failed.\n");
        free(first);
        free(second);
        return;
    }

    first->cityIndex = dest;
    first->cost = cost;
    first->next = adjList[src];
    adjList[src] = first;

    second->cityIndex = src;
    second->cost = cost;
    second->next = adjList[dest];
    adjList[dest] = second;
}

void displayGraph(void) {
    if (numCities == 0) {
        printf("No cities added yet.\n");
        return;
    }

    printf("\n===== FLIGHT PATH NETWORK =====\n");

    for (int i = 0; i < numCities; i++) {
        printf("%s -> ", cityNames[i]);

        struct Node *temp = adjList[i];

        if (temp == NULL) {
            printf("No direct flights");
        } else {
            while (temp != NULL) {
                printf("[%s | Cost: %d] ",
                       cityNames[temp->cityIndex], temp->cost);
                temp = temp->next;
            }
        }

        printf("\n");
    }
}

void DFS(int cityIndex) {
    visited[cityIndex] = 1;

    struct Node *temp = adjList[cityIndex];

    while (temp != NULL) {
        if (!visited[temp->cityIndex])
            DFS(temp->cityIndex);

        temp = temp->next;
    }
}

void checkConnectivity(void) {
    if (numCities == 0) {
        printf("No graph available to check connectivity.\n");
        return;
    }

    for (int i = 0; i < MAX_CITIES; i++)
        visited[i] = 0;

    DFS(0);

    int connected = 1;

    for (int i = 0; i < numCities; i++) {
        if (!visited[i]) {
            connected = 0;
            break;
        }
    }

    if (connected)
        printf("Result: The graph IS CONNECTED.\n");
    else
        printf("Result: The graph is NOT CONNECTED.\n");
}

int main(void) {
    int choice, numFlights, cost;
    char srcCity[50], destCity[50];

    do {
        printf("\n===== FLIGHT PATH MANAGEMENT MENU =====\n");
        printf("1. Input Cities and Flights\n");
        printf("2. Display Flight Paths\n");
        printf("3. Check Graph Connectivity\n");
        printf("4. Exit\n");
        printf("Enter choice: ");
        scanf("%d", &choice);

        switch (choice) {
            case 1:
                freeGraph();

                printf("Enter number of cities (max %d): ", MAX_CITIES);
                scanf("%d", &numCities);

                if (numCities < 1 || numCities > MAX_CITIES) {
                    printf("Invalid number of cities.\n");
                    numCities = 0;
                    break;
                }

                for (int i = 0; i < numCities; i++) {
                    printf("Enter name for City %d: ", i + 1);
                    scanf("%49s", cityNames[i]);
                }

                printf("Enter number of flight routes: ");
                scanf("%d", &numFlights);

                if (numFlights < 0) {
                    printf("Invalid number of routes.\n");
                    break;
                }

                for (int i = 0; i < numFlights; i++) {
                    printf("\nFlight %d details:\n", i + 1);
                    printf("Source City: ");
                    scanf("%49s", srcCity);

                    printf("Destination City: ");
                    scanf("%49s", destCity);

                    printf("Flight Cost/Time: ");
                    scanf("%d", &cost);

                    int srcIndex = getCityIndex(srcCity);
                    int destIndex = getCityIndex(destCity);

                    if (srcIndex != -1 && destIndex != -1)
                        addFlight(srcIndex, destIndex, cost);
                    else
                        printf("Invalid city name. Flight skipped.\n");
                }
                break;

            case 2:
                displayGraph();
                break;

            case 3:
                checkConnectivity();
                break;

            case 4:
                printf("Exiting program...\n");
                break;

            default:
                printf("Invalid selection. Try again.\n");
        }
    } while (choice != 4);

    freeGraph();
    return 0;
}`,
  },
];

const Home = () => {
  const [copiedId, setCopiedId] = useState(null);
  const [errorId, setErrorId] = useState(null);

  const handleCopy = async (program) => {
    try {
      await navigator.clipboard.writeText(program.code);
      setCopiedId(program.id);
      setErrorId(null);

      window.setTimeout(() => {
        setCopiedId((current) => (current === program.id ? null : current));
      }, 1800);
    } catch {
      setErrorId(program.id);

      window.setTimeout(() => {
        setErrorId((current) => (current === program.id ? null : current));
      }, 1800);
    }
  };

  const scrollToProgram = (id) => {
    document.getElementById(`program-${id}`)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <main className="w-full min-w-0 overflow-x-clip bg-slate-50 px-4 py-8 text-slate-900 sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto w-full min-w-0 max-w-4xl">
        <header className="mb-6 flex min-w-0 flex-col gap-5 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 sm:text-sm">
              Data Structures Practical
            </p>

            <h1 className="break-words text-3xl font-bold tracking-tight sm:text-4xl">
              Code Library
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
              All nine assignments in one place. Select an assignment number to
              jump directly to its code.
            </p>
          </div>

          <div className="flex w-fit shrink-0 items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 font-mono text-lg font-bold">
              {String(programs.length).padStart(2, "0")}
            </span>

            <div>
              <p className="text-sm font-semibold">Assignments</p>
              <p className="text-xs text-slate-500">C programs</p>
            </div>
          </div>
        </header>

        {/* One-line Assignment Index */}
        <nav
          aria-label="Jump to assignment"
          className="mb-7 w-full min-w-0 max-w-full overflow-x-auto pb-2"
        >
          <div className="flex w-max min-w-full items-center gap-2">
            <span className="mr-1 shrink-0 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Jump to
            </span>

            {programs.map((program) => (
              <button
                key={program.id}
                type="button"
                onClick={() => scrollToProgram(program.id)}
                aria-label={`Go to assignment ${program.id}`}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-sm font-semibold text-slate-700 transition-colors hover:border-slate-900 hover:bg-slate-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
              >
                {program.id}
              </button>
            ))}
          </div>
        </nav>

        {/* One Assignment Per Row */}
        <section
          aria-label="Data structures assignments"
          className="flex w-full min-w-0 flex-col gap-5"
        >
          {programs.map((program) => {
            const copied = copiedId === program.id;
            const failed = errorId === program.id;

            return (
              <article
                key={program.id}
                id={`program-${program.id}`}
                className="w-full min-w-0 max-w-full scroll-mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white transition-colors duration-200 hover:border-slate-300"
              >
                <div className="flex min-w-0 flex-wrap items-center gap-3 px-3 py-4 sm:flex-nowrap sm:px-5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 font-mono text-sm font-semibold text-slate-600">
                    {String(program.id).padStart(2, "0")}
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                      Assignment {program.id}
                    </p>

                    <h2 className="break-words text-sm font-semibold leading-6 text-slate-900 sm:text-base">
                      {program.title}
                    </h2>

                    <p className="mt-1 text-xs text-slate-500">C Program</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopy(program)}
                    aria-label={`Copy code for assignment ${program.id}`}
                    className={`ml-auto inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 ${
                      copied
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                        : failed
                          ? "border-red-200 bg-red-50 text-red-700"
                          : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {copied ? (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="h-4 w-4"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          d="m5 12 4 4L19 6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="h-4 w-4"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <rect x="8" y="8" width="13" height="13" rx="2" />
                        <path
                          d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"
                          strokeLinecap="round"
                        />
                      </svg>
                    )}

                    <span>
                      {copied ? "Copied!" : failed ? "Failed" : "Copy Code"}
                    </span>
                  </button>
                </div>

                <div className="w-full min-w-0 max-w-full border-t border-slate-800 bg-slate-950">
                  <pre className="block w-full min-w-0 max-w-full overflow-x-auto whitespace-pre p-4 text-[12px] leading-6 text-slate-200 sm:p-5 sm:text-[13px]">
                    <code className="font-mono">{program.code}</code>
                  </pre>
                </div>
              </article>
            );
          })}
        </section>
      </div>
    </main>
  );
};

export default Home;
