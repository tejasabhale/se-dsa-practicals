import React, { useCallback, useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { Terminal as XTerm } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import "@xterm/xterm/css/xterm.css";
import {
  Bug,
  Check,
  ChevronDown,
  ChevronRight,
  Circle,
  CircleHelp,
  Code2,
  Copy,
  Download,
  FileCode2,
  Files,
  FolderOpen,
  GitBranch,
  Maximize2,
  Minimize2,
  Minus,
  Square,
  Play,
  Puzzle,
  RotateCcw,
  Save,
  Search,
  Settings,
  SquareTerminal,
  Terminal,
  X,
} from "lucide-react";

const STORAGE_KEY = "dsa-code-editor-infix-postfix";
const C_RUNNER_WS_URL = "ws://127.0.0.1:4174";

const DEFAULT_CODE = `#include <stdio.h>
#include <ctype.h>

#define MAX 100

char stack[MAX];
int top = -1;

void push(char ch) {
    stack[++top] = ch;
}

int isEmpty(void) {
    return top == -1;
}

char peek(void) {
    if (isEmpty())
        return '\\0';

    return stack[top];
}

char pop(void) {
    if (isEmpty())
        return '\\0';

    return stack[top--];
}

int precedence(char ch) {
    if (ch == '^')
        return 3;
    else if (ch == '*' || ch == '/')
        return 2;
    else if (ch == '+' || ch == '-')
        return 1;
    else
        return 0;
}

void infixToPostfix(char infix[]) {
    char postfix[MAX];
    int i, j = 0;
    char ch;

    for (i = 0; infix[i] != '\\0'; i++) {
        ch = infix[i];

        if (isalnum((unsigned char)ch)) {
            postfix[j++] = ch;
        }
        else if (ch == '(') {
            push(ch);
        }
        else if (ch == ')') {
            while (!isEmpty() && peek() != '(') {
                postfix[j++] = pop();
            }
            if (!isEmpty())
                pop();
        }
        else {
            while (!isEmpty() && peek() != '(' &&
                   (precedence(peek()) > precedence(ch) ||
                   (precedence(peek()) == precedence(ch) && ch != '^'))) {
                postfix[j++] = pop();
            }
            push(ch);
        }
    }

    while (!isEmpty()) {
        postfix[j++] = pop();
    }

    postfix[j] = '\\0';

    printf("Postfix Expression: %s\\n", postfix);
}

int main(void) {
    char infix[MAX];

    printf("Enter infix expression: ");
    if (scanf("%99s", infix) != 1) {
        printf("Invalid input.\\n");
        return 1;
    }

    infixToPostfix(infix);

    return 0;
}`;

const ASSIGNMENTS = [
  {
    id: 1,
    title:
      "Menu-Driven Program to Search Roll Numbers Using Linear and Binary Search",
    fileName: "assignment-01.c",
    code: '#include <stdio.h>\n\n#define MAX 100\n\nint linearSearch(int arr[], int n, int key) {\n    for (int i = 0; i < n; i++) {\n        if (arr[i] == key)\n            return i;\n    }\n    return -1;\n}\n\nint binarySearch(int arr[], int n, int key) {\n    int low = 0, high = n - 1;\n\n    while (low <= high) {\n        int mid = low + (high - low) / 2;\n\n        if (arr[mid] == key)\n            return mid;\n        else if (arr[mid] < key)\n            low = mid + 1;\n        else\n            high = mid - 1;\n    }\n\n    return -1;\n}\n\nvoid bubbleSort(int arr[], int n) {\n    for (int i = 0; i < n - 1; i++) {\n        for (int j = 0; j < n - i - 1; j++) {\n            if (arr[j] > arr[j + 1]) {\n                int temp = arr[j];\n                arr[j] = arr[j + 1];\n                arr[j + 1] = temp;\n            }\n        }\n    }\n}\n\nint main(void) {\n    int arr[MAX], n, key, choice, result;\n\n    printf("Enter the number of elements: ");\n    if (scanf("%d", &n) != 1 || n < 1 || n > MAX) {\n        printf("Invalid number of elements.\\n");\n        return 1;\n    }\n\n    printf("Enter the roll numbers:\\n");\n    for (int i = 0; i < n; i++)\n        scanf("%d", &arr[i]);\n\n    do {\n        printf("\\n===== MENU =====\\n");\n        printf("1. Linear Search\\n");\n        printf("2. Binary Search\\n");\n        printf("3. Exit\\n");\n        printf("Enter your choice: ");\n        scanf("%d", &choice);\n\n        switch (choice) {\n            case 1:\n                printf("Enter roll number to search: ");\n                scanf("%d", &key);\n\n                result = linearSearch(arr, n, key);\n\n                if (result != -1)\n                    printf("Roll number found at index %d.\\n", result);\n                else\n                    printf("Roll number not found.\\n");\n                break;\n\n            case 2:\n                bubbleSort(arr, n);\n\n                printf("Sorted array: ");\n                for (int i = 0; i < n; i++)\n                    printf("%d ", arr[i]);\n\n                printf("\\nEnter roll number to search: ");\n                scanf("%d", &key);\n\n                result = binarySearch(arr, n, key);\n\n                if (result != -1)\n                    printf("Roll number found at index %d in the sorted array.\\n", result);\n                else\n                    printf("Roll number not found.\\n");\n                break;\n\n            case 3:\n                printf("Exiting program...\\n");\n                break;\n\n            default:\n                printf("Invalid choice. Please try again.\\n");\n        }\n    } while (choice != 3);\n\n    return 0;\n}',
  },
  {
    id: 2,
    title: "Menu-Driven Program to Implement Bubble Sort and Selection Sort",
    fileName: "assignment-02.c",
    code: '#include <stdio.h>\n\n#define MAX 100\n\nvoid bubbleSort(int arr[], int n) {\n    for (int i = 0; i < n - 1; i++) {\n        int swapped = 0;\n\n        for (int j = 0; j < n - i - 1; j++) {\n            if (arr[j] > arr[j + 1]) {\n                int temp = arr[j];\n                arr[j] = arr[j + 1];\n                arr[j + 1] = temp;\n                swapped = 1;\n            }\n        }\n\n        if (!swapped)\n            break;\n    }\n}\n\nvoid selectionSort(int arr[], int n) {\n    for (int i = 0; i < n - 1; i++) {\n        int minIndex = i;\n\n        for (int j = i + 1; j < n; j++) {\n            if (arr[j] < arr[minIndex])\n                minIndex = j;\n        }\n\n        int temp = arr[minIndex];\n        arr[minIndex] = arr[i];\n        arr[i] = temp;\n    }\n}\n\nint main(void) {\n    int choice, arr[MAX], n;\n\n    do {\n        printf("\\n===== SORTING MENU =====\\n");\n        printf("1. Bubble Sort\\n");\n        printf("2. Selection Sort\\n");\n        printf("3. Exit\\n");\n        printf("Enter your choice: ");\n        scanf("%d", &choice);\n\n        if (choice == 1 || choice == 2) {\n            printf("Enter array size (1-%d): ", MAX);\n            scanf("%d", &n);\n\n            if (n < 1 || n > MAX) {\n                printf("Invalid array size.\\n");\n                continue;\n            }\n\n            printf("Enter array elements:\\n");\n            for (int i = 0; i < n; i++)\n                scanf("%d", &arr[i]);\n\n            if (choice == 1) {\n                bubbleSort(arr, n);\n                printf("Bubble Sort Result: ");\n            } else {\n                selectionSort(arr, n);\n                printf("Selection Sort Result: ");\n            }\n\n            for (int i = 0; i < n; i++)\n                printf("%d ", arr[i]);\n\n            printf("\\n");\n        } else if (choice == 3) {\n            printf("Exiting program.\\n");\n        } else {\n            printf("Invalid choice.\\n");\n        }\n    } while (choice != 3);\n\n    return 0;\n}',
  },
  {
    id: 3,
    title:
      "Implementation of a Hash Table-Based Telephone Directory Using Collision Resolution",
    fileName: "assignment-03.c",
    code: '#include <stdio.h>\n\n#define SIZE 10\n\nint linear[SIZE], quadratic[SIZE], doubleHash[SIZE];\n\nvoid initialize(void) {\n    for (int i = 0; i < SIZE; i++)\n        linear[i] = quadratic[i] = doubleHash[i] = -1;\n}\n\nvoid display(int table[]) {\n    printf("\\nIndex : Key\\n");\n\n    for (int i = 0; i < SIZE; i++) {\n        if (table[i] == -1)\n            printf("%d : Empty\\n", i);\n        else\n            printf("%d : %d\\n", i, table[i]);\n    }\n}\n\nvoid insertKey(int table[], int key, int method) {\n    if (key < 0) {\n        printf("Enter a non-negative key.\\n");\n        return;\n    }\n\n    int h = key % SIZE;\n    int step = 7 - key % 7;\n\n    for (int i = 0; i < SIZE; i++) {\n        int position;\n\n        if (method == 1)\n            position = (h + i) % SIZE;\n        else if (method == 2)\n            position = (h + i * i) % SIZE;\n        else\n            position = (h + i * step) % SIZE;\n\n        if (table[position] == key) {\n            printf("Key already exists at index %d.\\n", position);\n            return;\n        }\n\n        if (table[position] == -1) {\n            table[position] = key;\n            printf("Inserted at index %d.\\n", position);\n            return;\n        }\n    }\n\n    printf("No available slot found. Table may be full.\\n");\n}\n\nint main(void) {\n    int choice, operation, key;\n    int *table;\n\n    initialize();\n\n    do {\n        printf("\\n===== HASH TABLE MENU =====\\n");\n        printf("1. Linear Probing\\n");\n        printf("2. Quadratic Probing\\n");\n        printf("3. Double Hashing\\n");\n        printf("4. Exit\\n");\n        printf("Enter choice: ");\n        scanf("%d", &choice);\n\n        if (choice == 4)\n            break;\n\n        if (choice < 1 || choice > 3) {\n            printf("Invalid choice.\\n");\n            continue;\n        }\n\n        table = (choice == 1) ? linear :\n                (choice == 2) ? quadratic : doubleHash;\n\n        do {\n            printf("\\n1. Insert\\n");\n            printf("2. Display\\n");\n            printf("3. Back\\n");\n            printf("Enter choice: ");\n            scanf("%d", &operation);\n\n            if (operation == 1) {\n                printf("Enter key: ");\n                scanf("%d", &key);\n                insertKey(table, key, choice);\n            } else if (operation == 2) {\n                display(table);\n            } else if (operation != 3) {\n                printf("Invalid choice.\\n");\n            }\n        } while (operation != 3);\n\n    } while (choice != 4);\n\n    return 0;\n}',
  },
  {
    id: 4,
    title: "Club Member Management Using a Singly Linked List",
    fileName: "assignment-04.c",
    code: '#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\nstruct Node {\n    int prn;\n    char name[50];\n    struct Node *next;\n};\n\nstruct Node *createNode(int prn, const char *name) {\n    struct Node *newNode = malloc(sizeof(struct Node));\n\n    if (newNode == NULL) {\n        printf("Memory allocation failed.\\n");\n        exit(1);\n    }\n\n    newNode->prn = prn;\n    snprintf(newNode->name, sizeof(newNode->name), "%s", name);\n    newNode->next = NULL;\n\n    return newNode;\n}\n\nstruct Node *addPresident(struct Node *head, int prn, const char *name) {\n    struct Node *newNode = createNode(prn, name);\n    newNode->next = head;\n    return newNode;\n}\n\nstruct Node *addSecretary(struct Node *head, int prn, const char *name) {\n    struct Node *newNode = createNode(prn, name);\n\n    if (head == NULL)\n        return newNode;\n\n    struct Node *temp = head;\n\n    while (temp->next != NULL)\n        temp = temp->next;\n\n    temp->next = newNode;\n    return head;\n}\n\nstruct Node *addMember(struct Node *head, int prn, const char *name) {\n    if (head == NULL || head->next == NULL) {\n        printf("Add the President and Secretary first.\\n");\n        return head;\n    }\n\n    struct Node *newNode = createNode(prn, name);\n    struct Node *temp = head;\n\n    while (temp->next->next != NULL)\n        temp = temp->next;\n\n    newNode->next = temp->next;\n    temp->next = newNode;\n\n    return head;\n}\n\nvoid displayList(struct Node *head) {\n    if (head == NULL) {\n        printf("The list is empty.\\n");\n        return;\n    }\n\n    printf("President is first and Secretary is last.\\n");\n    printf("PRN\\tName\\n");\n\n    while (head != NULL) {\n        printf("%d\\t%s\\n", head->prn, head->name);\n        head = head->next;\n    }\n}\n\nvoid countMembers(struct Node *head) {\n    int count = 0;\n\n    while (head != NULL) {\n        count++;\n        head = head->next;\n    }\n\n    printf("Total members: %d\\n", count);\n}\n\nstruct Node *deletePresident(struct Node *head) {\n    if (head == NULL) {\n        printf("List is empty.\\n");\n        return NULL;\n    }\n\n    struct Node *temp = head;\n    head = head->next;\n    free(temp);\n\n    return head;\n}\n\nstruct Node *deleteSecretary(struct Node *head) {\n    if (head == NULL || head->next == NULL) {\n        printf("A Secretary cannot be deleted from this list.\\n");\n        return head;\n    }\n\n    struct Node *temp = head;\n\n    while (temp->next->next != NULL)\n        temp = temp->next;\n\n    free(temp->next);\n    temp->next = NULL;\n\n    return head;\n}\n\nstruct Node *deleteMember(struct Node *head, int prn) {\n    struct Node *temp = head;\n    struct Node *prev = NULL;\n\n    while (temp != NULL && temp->prn != prn) {\n        prev = temp;\n        temp = temp->next;\n    }\n\n    if (temp == NULL) {\n        printf("Member with PRN %d not found.\\n", prn);\n        return head;\n    }\n\n    if (prev == NULL)\n        head = temp->next;\n    else\n        prev->next = temp->next;\n\n    free(temp);\n    return head;\n}\n\nvoid freeList(struct Node *head) {\n    while (head != NULL) {\n        struct Node *temp = head;\n        head = head->next;\n        free(temp);\n    }\n}\n\nint main(void) {\n    struct Node *head = NULL;\n    int choice, prn, again;\n    char name[50];\n\n    do {\n        printf("\\n===== CLUB MEMBER MENU =====\\n");\n        printf("1. Add President\\n");\n        printf("2. Add Secretary\\n");\n        printf("3. Add Member\\n");\n        printf("4. Delete President\\n");\n        printf("5. Delete Secretary\\n");\n        printf("6. Delete Member\\n");\n        printf("7. Display List\\n");\n        printf("8. Count Members\\n");\n        printf("Enter your choice: ");\n        scanf("%d", &choice);\n\n        switch (choice) {\n            case 1:\n            case 2:\n            case 3:\n                printf("Enter PRN: ");\n                scanf("%d", &prn);\n                printf("Enter Name (one word): ");\n                scanf("%49s", name);\n\n                if (choice == 1)\n                    head = addPresident(head, prn, name);\n                else if (choice == 2)\n                    head = addSecretary(head, prn, name);\n                else\n                    head = addMember(head, prn, name);\n                break;\n\n            case 4:\n                head = deletePresident(head);\n                break;\n\n            case 5:\n                head = deleteSecretary(head);\n                break;\n\n            case 6:\n                printf("Enter PRN to delete: ");\n                scanf("%d", &prn);\n                head = deleteMember(head, prn);\n                break;\n\n            case 7:\n                displayList(head);\n                break;\n\n            case 8:\n                countMembers(head);\n                break;\n\n            default:\n                printf("Invalid choice.\\n");\n        }\n\n        printf("Continue? (1 = Yes, 0 = No): ");\n        scanf("%d", &again);\n\n    } while (again == 1);\n\n    displayList(head);\n    freeList(head);\n\n    return 0;\n}',
  },
  {
    id: 5,
    title: "Cinemax Theater Ticket Booking Using a Doubly Linked List",
    fileName: "assignment-05.c",
    code: '#include <stdio.h>\n#include <stdlib.h>\n\n#define ROWS 10\n#define SEATS 10\n\nstruct Seat {\n    int seat_num;\n    int status;\n    struct Seat *next;\n    struct Seat *prev;\n};\n\nstruct Seat *row_heads[ROWS];\n\nstruct Seat *createSeat(int seat_num) {\n    struct Seat *newSeat = malloc(sizeof(struct Seat));\n\n    if (newSeat == NULL) {\n        printf("Memory allocation failed.\\n");\n        exit(1);\n    }\n\n    newSeat->seat_num = seat_num;\n    newSeat->status = -1;\n    newSeat->next = NULL;\n    newSeat->prev = NULL;\n\n    return newSeat;\n}\n\nvoid createRows(void) {\n    for (int i = 0; i < ROWS; i++) {\n        struct Seat *head = NULL;\n        struct Seat *prev = NULL;\n\n        for (int j = 1; j <= SEATS; j++) {\n            struct Seat *newSeat = createSeat(j);\n\n            if (head == NULL)\n                head = newSeat;\n            else {\n                prev->next = newSeat;\n                newSeat->prev = prev;\n            }\n\n            prev = newSeat;\n        }\n\n        row_heads[i] = head;\n    }\n}\n\nstruct Seat *findSeat(int row, int seat_num) {\n    if (row < 1 || row > ROWS ||\n        seat_num < 1 || seat_num > SEATS) {\n        printf("Invalid row or seat number.\\n");\n        return NULL;\n    }\n\n    struct Seat *temp = row_heads[row - 1];\n\n    while (temp != NULL && temp->seat_num != seat_num)\n        temp = temp->next;\n\n    return temp;\n}\n\nvoid displaySeats(void) {\n    printf("\\nSeat Layout ([ ] Available, [X] Booked)\\n");\n\n    for (int i = 0; i < ROWS; i++) {\n        struct Seat *temp = row_heads[i];\n        printf("Row %2d: ", i + 1);\n\n        while (temp != NULL) {\n            printf(temp->status == 1 ? "[X] " : "[ ] ");\n            temp = temp->next;\n        }\n\n        printf("\\n");\n    }\n}\n\nvoid bookSeat(int row, int seat_num) {\n    struct Seat *seat = findSeat(row, seat_num);\n\n    if (seat == NULL)\n        return;\n\n    if (seat->status == 1)\n        printf("Seat is already booked.\\n");\n    else {\n        seat->status = 1;\n        printf("Seat booked successfully.\\n");\n    }\n}\n\nvoid deleteSeat(int row, int seat_num) {\n    struct Seat *seat = findSeat(row, seat_num);\n\n    if (seat == NULL)\n        return;\n\n    if (seat->status == -1)\n        printf("Seat is already available.\\n");\n    else {\n        seat->status = -1;\n        printf("Booking cancelled successfully.\\n");\n    }\n}\n\nvoid freeRows(void) {\n    for (int i = 0; i < ROWS; i++) {\n        struct Seat *temp = row_heads[i];\n\n        while (temp != NULL) {\n            struct Seat *next = temp->next;\n            free(temp);\n            temp = next;\n        }\n\n        row_heads[i] = NULL;\n    }\n}\n\nint main(void) {\n    int choice, row, seat;\n    createRows();\n\n    do {\n        printf("\\n===== CINEMAX MENU =====\\n");\n        printf("1. Book Seat\\n");\n        printf("2. Delete Seat Booking\\n");\n        printf("3. Display Seats\\n");\n        printf("4. Exit\\n");\n        printf("Enter choice: ");\n        scanf("%d", &choice);\n\n        switch (choice) {\n            case 1:\n            case 2:\n                printf("Enter row number (1-%d): ", ROWS);\n                scanf("%d", &row);\n                printf("Enter seat number (1-%d): ", SEATS);\n                scanf("%d", &seat);\n\n                if (choice == 1)\n                    bookSeat(row, seat);\n                else\n                    deleteSeat(row, seat);\n                break;\n\n            case 3:\n                displaySeats();\n                break;\n\n            case 4:\n                printf("Exiting program.\\n");\n                break;\n\n            default:\n                printf("Invalid choice.\\n");\n        }\n    } while (choice != 4);\n\n    freeRows();\n    return 0;\n}',
  },
  {
    id: 6,
    title: "Infix to Postfix Expression Conversion Using a Stack",
    fileName: "assignment-06.c",
    code: DEFAULT_CODE,
  },
  {
    id: 7,
    title: "Simulation of a Pizza Parlor Job Queue Using a Queue",
    fileName: "assignment-07.c",
    code: '#include <stdio.h>\n\n#define MAX 100\n\nint queue[MAX];\nint front = -1, rear = -1;\n\nvoid orderPizza(int value) {\n    if (front == (rear + 1) % MAX) {\n        printf("Queue is full.\\n");\n        return;\n    }\n\n    if (front == -1)\n        front = rear = 0;\n    else\n        rear = (rear + 1) % MAX;\n\n    queue[rear] = value;\n    printf("Order added successfully.\\n");\n}\n\nvoid processOrder(void) {\n    if (front == -1) {\n        printf("Queue is empty.\\n");\n        return;\n    }\n\n    printf("Processing order quantity: %d\\n", queue[front]);\n\n    if (front == rear)\n        front = rear = -1;\n    else\n        front = (front + 1) % MAX;\n}\n\nvoid displayOrders(void) {\n    if (front == -1) {\n        printf("Queue is empty.\\n");\n        return;\n    }\n\n    printf("Pizza Orders: ");\n\n    int i = front;\n\n    while (1) {\n        printf("%d ", queue[i]);\n\n        if (i == rear)\n            break;\n\n        i = (i + 1) % MAX;\n    }\n\n    printf("\\n");\n}\n\nint main(void) {\n    int choice, value;\n\n    do {\n        printf("\\n===== PIZZA PARLOR MENU =====\\n");\n        printf("1. Order Pizza\\n");\n        printf("2. Process Order\\n");\n        printf("3. Display Orders\\n");\n        printf("4. Exit\\n");\n        printf("Enter your choice: ");\n        scanf("%d", &choice);\n\n        switch (choice) {\n            case 1:\n                printf("Enter order quantity: ");\n                scanf("%d", &value);\n                orderPizza(value);\n                break;\n\n            case 2:\n                processOrder();\n                break;\n\n            case 3:\n                displayOrders();\n                break;\n\n            case 4:\n                printf("Exiting program...\\n");\n                break;\n\n            default:\n                printf("Invalid choice. Please try again.\\n");\n        }\n    } while (choice != 4);\n\n    return 0;\n}',
  },
  {
    id: 8,
    title:
      "Binary Search Tree: Insertion, Searching, Minimum, Height and Mirror Image",
    fileName: "assignment-08.c",
    code: '#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node *left;\n    struct Node *right;\n};\n\nstruct Node *createNode(int value) {\n    struct Node *newNode = malloc(sizeof(struct Node));\n\n    if (newNode == NULL) {\n        printf("Memory allocation failed.\\n");\n        exit(1);\n    }\n\n    newNode->data = value;\n    newNode->left = NULL;\n    newNode->right = NULL;\n\n    return newNode;\n}\n\nstruct Node *insert(struct Node *root, int value) {\n    if (root == NULL)\n        return createNode(value);\n\n    if (value < root->data)\n        root->left = insert(root->left, value);\n    else if (value > root->data)\n        root->right = insert(root->right, value);\n    else\n        printf("Duplicate value ignored.\\n");\n\n    return root;\n}\n\nvoid inorder(struct Node *root) {\n    if (root != NULL) {\n        inorder(root->left);\n        printf("%d ", root->data);\n        inorder(root->right);\n    }\n}\n\nvoid findMinimum(struct Node *root, int *minimum) {\n    if (root == NULL)\n        return;\n\n    if (root->data < *minimum)\n        *minimum = root->data;\n\n    findMinimum(root->left, minimum);\n    findMinimum(root->right, minimum);\n}\n\nint calculateHeight(struct Node *root) {\n    if (root == NULL)\n        return 0;\n\n    int leftHeight = calculateHeight(root->left);\n    int rightHeight = calculateHeight(root->right);\n\n    return 1 + (leftHeight > rightHeight ? leftHeight : rightHeight);\n}\n\nvoid mirrorTree(struct Node *root) {\n    if (root == NULL)\n        return;\n\n    struct Node *temp = root->left;\n    root->left = root->right;\n    root->right = temp;\n\n    mirrorTree(root->left);\n    mirrorTree(root->right);\n}\n\nint search(struct Node *root, int key) {\n    if (root == NULL)\n        return 0;\n\n    if (root->data == key)\n        return 1;\n\n    return search(root->left, key) || search(root->right, key);\n}\n\nvoid freeTree(struct Node *root) {\n    if (root != NULL) {\n        freeTree(root->left);\n        freeTree(root->right);\n        free(root);\n    }\n}\n\nint main(void) {\n    struct Node *root = NULL;\n    int choice, value, minimum;\n\n    do {\n        printf("\\n===== BINARY SEARCH TREE MENU =====\\n");\n        printf("1. Insert Node\\n");\n        printf("2. Display Tree (Inorder)\\n");\n        printf("3. Find Minimum Value\\n");\n        printf("4. Find Height of Tree\\n");\n        printf("5. Mirror the Tree\\n");\n        printf("6. Search a Value\\n");\n        printf("7. Exit\\n");\n        printf("Enter choice: ");\n        scanf("%d", &choice);\n\n        switch (choice) {\n            case 1:\n                printf("Enter value to insert: ");\n                scanf("%d", &value);\n                root = insert(root, value);\n                break;\n\n            case 2:\n                if (root == NULL)\n                    printf("Tree is empty.\\n");\n                else {\n                    printf("Inorder Traversal: ");\n                    inorder(root);\n                    printf("\\n");\n                }\n                break;\n\n            case 3:\n                if (root == NULL) {\n                    printf("Tree is empty.\\n");\n                } else {\n                    minimum = root->data;\n                    findMinimum(root, &minimum);\n                    printf("Minimum value: %d\\n", minimum);\n                }\n                break;\n\n            case 4:\n                printf("Height of Tree: %d\\n", calculateHeight(root));\n                break;\n\n            case 5:\n                mirrorTree(root);\n                printf("Tree mirrored successfully.\\n");\n                printf("New Inorder Traversal: ");\n                inorder(root);\n                printf("\\n");\n                break;\n\n            case 6:\n                printf("Enter value to search: ");\n                scanf("%d", &value);\n\n                if (search(root, value))\n                    printf("Value found in the tree.\\n");\n                else\n                    printf("Value not found in the tree.\\n");\n                break;\n\n            case 7:\n                printf("Exiting program...\\n");\n                break;\n\n            default:\n                printf("Invalid choice. Enter 1-7.\\n");\n        }\n    } while (choice != 7);\n\n    freeTree(root);\n    return 0;\n}',
  },
  {
    id: 9,
    title:
      "Representing Flight Paths and Costs Using a Graph and Checking Connectivity with DFS",
    fileName: "assignment-09.c",
    code: '#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\n#define MAX_CITIES 10\n\nstruct Node {\n    int cityIndex;\n    int cost;\n    struct Node *next;\n};\n\nchar cityNames[MAX_CITIES][50];\nstruct Node *adjList[MAX_CITIES];\nint numCities = 0;\nint visited[MAX_CITIES];\n\nint getCityIndex(char name[]) {\n    for (int i = 0; i < numCities; i++) {\n        if (strcmp(cityNames[i], name) == 0)\n            return i;\n    }\n\n    return -1;\n}\n\nvoid freeGraph(void) {\n    for (int i = 0; i < MAX_CITIES; i++) {\n        struct Node *temp = adjList[i];\n\n        while (temp != NULL) {\n            struct Node *next = temp->next;\n            free(temp);\n            temp = next;\n        }\n\n        adjList[i] = NULL;\n    }\n}\n\nvoid addFlight(int src, int dest, int cost) {\n    struct Node *first = malloc(sizeof(struct Node));\n    struct Node *second = malloc(sizeof(struct Node));\n\n    if (first == NULL || second == NULL) {\n        printf("Memory allocation failed.\\n");\n        free(first);\n        free(second);\n        return;\n    }\n\n    first->cityIndex = dest;\n    first->cost = cost;\n    first->next = adjList[src];\n    adjList[src] = first;\n\n    second->cityIndex = src;\n    second->cost = cost;\n    second->next = adjList[dest];\n    adjList[dest] = second;\n}\n\nvoid displayGraph(void) {\n    if (numCities == 0) {\n        printf("No cities added yet.\\n");\n        return;\n    }\n\n    printf("\\n===== FLIGHT PATH NETWORK =====\\n");\n\n    for (int i = 0; i < numCities; i++) {\n        printf("%s -> ", cityNames[i]);\n\n        struct Node *temp = adjList[i];\n\n        if (temp == NULL) {\n            printf("No direct flights");\n        } else {\n            while (temp != NULL) {\n                printf("[%s | Cost: %d] ",\n                       cityNames[temp->cityIndex], temp->cost);\n                temp = temp->next;\n            }\n        }\n\n        printf("\\n");\n    }\n}\n\nvoid DFS(int cityIndex) {\n    visited[cityIndex] = 1;\n\n    struct Node *temp = adjList[cityIndex];\n\n    while (temp != NULL) {\n        if (!visited[temp->cityIndex])\n            DFS(temp->cityIndex);\n\n        temp = temp->next;\n    }\n}\n\nvoid checkConnectivity(void) {\n    if (numCities == 0) {\n        printf("No graph available to check connectivity.\\n");\n        return;\n    }\n\n    for (int i = 0; i < MAX_CITIES; i++)\n        visited[i] = 0;\n\n    DFS(0);\n\n    int connected = 1;\n\n    for (int i = 0; i < numCities; i++) {\n        if (!visited[i]) {\n            connected = 0;\n            break;\n        }\n    }\n\n    if (connected)\n        printf("Result: The graph IS CONNECTED.\\n");\n    else\n        printf("Result: The graph is NOT CONNECTED.\\n");\n}\n\nint main(void) {\n    int choice, numFlights, cost;\n    char srcCity[50], destCity[50];\n\n    do {\n        printf("\\n===== FLIGHT PATH MANAGEMENT MENU =====\\n");\n        printf("1. Input Cities and Flights\\n");\n        printf("2. Display Flight Paths\\n");\n        printf("3. Check Graph Connectivity\\n");\n        printf("4. Exit\\n");\n        printf("Enter choice: ");\n        scanf("%d", &choice);\n\n        switch (choice) {\n            case 1:\n                freeGraph();\n\n                printf("Enter number of cities (max %d): ", MAX_CITIES);\n                scanf("%d", &numCities);\n\n                if (numCities < 1 || numCities > MAX_CITIES) {\n                    printf("Invalid number of cities.\\n");\n                    numCities = 0;\n                    break;\n                }\n\n                for (int i = 0; i < numCities; i++) {\n                    printf("Enter name for City %d: ", i + 1);\n                    scanf("%49s", cityNames[i]);\n                }\n\n                printf("Enter number of flight routes: ");\n                scanf("%d", &numFlights);\n\n                if (numFlights < 0) {\n                    printf("Invalid number of routes.\\n");\n                    break;\n                }\n\n                for (int i = 0; i < numFlights; i++) {\n                    printf("\\nFlight %d details:\\n", i + 1);\n                    printf("Source City: ");\n                    scanf("%49s", srcCity);\n\n                    printf("Destination City: ");\n                    scanf("%49s", destCity);\n\n                    printf("Flight Cost/Time: ");\n                    scanf("%d", &cost);\n\n                    int srcIndex = getCityIndex(srcCity);\n                    int destIndex = getCityIndex(destCity);\n\n                    if (srcIndex != -1 && destIndex != -1)\n                        addFlight(srcIndex, destIndex, cost);\n                    else\n                        printf("Invalid city name. Flight skipped.\\n");\n                }\n                break;\n\n            case 2:\n                displayGraph();\n                break;\n\n            case 3:\n                checkConnectivity();\n                break;\n\n            case 4:\n                printf("Exiting program...\\n");\n                break;\n\n            default:\n                printf("Invalid selection. Try again.\\n");\n        }\n    } while (choice != 4);\n\n    freeGraph();\n    return 0;\n}',
  },
];

const getAssignmentStorageKey = (assignmentId) =>
  assignmentId === 6 ? STORAGE_KEY : `se-practical-assignment-${assignmentId}`;

function getFunctionNames(source) {
  const names = [];
  const pattern = /^\s*(?:[A-Za-z_]\w*[\s*]+)+(\w+)\s*\([^;]*\)\s*\{/gm;
  let match;
  while ((match = pattern.exec(source)) !== null) {
    if (!names.includes(match[1])) names.push(match[1]);
  }
  return names;
}

function IconButton({
  title,
  onClick,
  children,
  className = "",
  disabled = false,
}) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-md transition-colors focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
}

const activityItems = [
  { id: "explorer", label: "Explorer", Icon: Files },
  { id: "search", label: "Search", Icon: Search },
  { id: "source", label: "Source Control", Icon: GitBranch },
  { id: "run", label: "Run and Debug", Icon: Bug },
  { id: "extensions", label: "Extensions", Icon: Puzzle },
];

const MENU_CONFIG = {
  File: [
    {
      label: "Open Assignment…",
      command: "openAssignmentPicker",
      shortcut: "Ctrl+Shift+P",
    },
    { separator: true },
    { label: "Save", command: "save", shortcut: "Ctrl+S" },
    { label: "Save As / Download…", command: "download" },
    { label: "Restore Starter Code", command: "restoreStarter" },
    { separator: true },
    { label: "Close Editor", command: "closeFile", shortcut: "Ctrl+F4" },
    { label: "Open Editor", command: "openFile" },
    { separator: true },
    { label: "Close Workspace", command: "closeWorkspace" },
  ],
  Edit: [
    { label: "Undo", command: "undo", shortcut: "Ctrl+Z" },
    { label: "Redo", command: "redo", shortcut: "Ctrl+Y" },
    { separator: true },
    { label: "Cut", command: "cut", shortcut: "Ctrl+X" },
    { label: "Copy Source", command: "copy", shortcut: "Ctrl+C" },
    { label: "Paste", command: "paste", shortcut: "Ctrl+V" },
    { separator: true },
    { label: "Find", command: "find", shortcut: "Ctrl+F" },
    { label: "Find and Replace", command: "replace", shortcut: "Ctrl+H" },
    {
      label: "Toggle Line Comment",
      command: "commentLine",
      shortcut: "Ctrl+/",
    },
  ],
  Selection: [
    {
      label: "Select All Source",
      command: "selectAll",
      shortcut: "Ctrl+Alt+Shift+A",
    },
    {
      label: "Expand Selection",
      command: "expandSelection",
      shortcut: "Shift+Alt+→",
    },
    {
      label: "Shrink Selection",
      command: "shrinkSelection",
      shortcut: "Shift+Alt+←",
    },
  ],
  View: [
    { label: "Toggle Explorer", command: "toggleExplorer", shortcut: "Ctrl+B" },
    {
      label: "Toggle Bottom Panel",
      command: "togglePanel",
      shortcut: "Ctrl+J",
    },
    { label: "Toggle Minimap", command: "toggleMinimap" },
    { label: "Toggle Word Wrap", command: "toggleWordWrap", shortcut: "Alt+Z" },
    { label: "Enter / Exit Full Screen", command: "toggleFullscreen" },
  ],
  Go: [
    { label: "Go to Line…", command: "gotoLine", shortcut: "Ctrl+G" },
    { separator: true },
    { label: "Previous Assignment", command: "previousAssignment" },
    { label: "Next Assignment", command: "nextAssignment" },
    { label: "Select Assignment…", command: "openAssignmentPicker" },
  ],
  Run: [
    { label: "Run C Program", command: "run", shortcut: "Ctrl+Enter" },
    { label: "Restore Starter Code", command: "restoreStarter" },
    { label: "Clear Run Output", command: "clearTerminal" },
  ],
  Terminal: [
    {
      label: "Toggle Terminal Panel",
      command: "togglePanel",
      shortcut: "Ctrl+J",
    },
    { label: "Clear Terminal", command: "clearTerminal" },
    { label: "Focus Standard Input", command: "focusStdin" },
  ],
  Help: [
    { label: "Keyboard Shortcuts", command: "keyboardShortcuts" },
    { label: "About This Workspace", command: "about" },
  ],
};

export default function CodeEditor() {
  const [activeAssignmentId, setActiveAssignmentId] = useState(6);
  const [isAssignmentPickerOpen, setIsAssignmentPickerOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isWorkspaceClosed, setIsWorkspaceClosed] = useState(false);
  const [minimapEnabled, setMinimapEnabled] = useState(true);
  const [wordWrapEnabled, setWordWrapEnabled] = useState(false);
  const [assignmentSearch, setAssignmentSearch] = useState("");
  const assignmentSearchRef = useRef(null);
  const [code, setCode] = useState(() => {
    try {
      return (
        window.localStorage.getItem(getAssignmentStorageKey(6)) || DEFAULT_CODE
      );
    } catch {
      return DEFAULT_CODE;
    }
  });
  const [activeActivity, setActiveActivity] = useState("explorer");
  const [activeBottomTab, setActiveBottomTab] = useState("TERMINAL");
  const [isFileOpen, setIsFileOpen] = useState(true);
  const [isExplorerOpen, setIsExplorerOpen] = useState(true);
  const [isBottomPanelOpen, setIsBottomPanelOpen] = useState(true);
  const [terminalHeight, setTerminalHeight] = useState(250);
  const [isResizingTerminal, setIsResizingTerminal] = useState(false);
  const [isNativeFullscreen, setIsNativeFullscreen] = useState(false);
  const [terminalText, setTerminalText] = useState(
    "Local C terminal ready.\r\nPress Run or Ctrl+Enter to compile and start the current program.\r\nType input here while the program is running, then press Enter.\r\n",
  );
  const [programOutput, setProgramOutput] = useState("");
  const [problemOutput, setProblemOutput] = useState(
    "No compiler diagnostics yet.",
  );
  const [runState, setRunState] = useState("idle");
  const [isRunning, setIsRunning] = useState(false);
  const [toast, setToast] = useState("");
  const [cursorPosition, setCursorPosition] = useState({ line: 1, column: 1 });
  const activeAssignment =
    ASSIGNMENTS.find((assignment) => assignment.id === activeAssignmentId) ||
    ASSIGNMENTS[5];
  const editorRef = useRef(null);
  const terminalRef = useRef(null);
  const xtermRef = useRef(null);
  const fitAddonRef = useRef(null);
  const socketRef = useRef(null);
  const activeProcessRef = useRef(false);
  const terminalLineBufferRef = useRef("");
  const terminalRenderedTextRef = useRef("");
  const pendingInputRef = useRef([]);
  const lastWasCarriageReturnRef = useRef(false);
  const terminalResizeRef = useRef({ startY: 0, startHeight: 250 });
  const toastTimeoutRef = useRef(null);
  const autoFullscreenAttemptedRef = useRef(false);

  const showToast = useCallback((message) => {
    setToast(message);
    if (toastTimeoutRef.current) window.clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = window.setTimeout(() => setToast(""), 2200);
  }, []);

  const stopActiveRun = useCallback(() => {
    activeProcessRef.current = false;
    terminalLineBufferRef.current = "";
    pendingInputRef.current = [];
    const socket = socketRef.current;
    socketRef.current = null;
    if (socket) {
      try {
        if (socket.readyState === WebSocket.OPEN)
          socket.send(JSON.stringify({ type: "kill" }));
        socket.close();
      } catch {
        // Closing the connection also tells the local runner to stop its process.
      }
    }
    setIsRunning(false);
  }, []);

  useEffect(
    () => () => {
      activeProcessRef.current = false;
      const socket = socketRef.current;
      socketRef.current = null;
      if (socket) {
        try {
          socket.close();
        } catch {
          /* Ignore an already closed socket. */
        }
      }
    },
    [],
  );

  useEffect(() => {
    try {
      window.localStorage.setItem(
        getAssignmentStorageKey(activeAssignmentId),
        code,
      );
    } catch {
      // Local storage may be disabled; editing and running still work.
    }
  }, [code, activeAssignmentId]);

  useEffect(() => {
    if (!isBottomPanelOpen || !terminalRef.current) return undefined;

    const terminal = new XTerm({
      cursorBlink: true,
      convertEol: true,
      scrollback: 5000,
      fontFamily: '"Cascadia Code", Consolas, "Courier New", monospace',
      fontSize: 12,
      lineHeight: 1.35,
      theme: {
        background: "#181818",
        foreground: "#d4d4d4",
        cursor: "#aeafad",
        cursorAccent: "#181818",
        selectionBackground: "#264f78",
        black: "#000000",
        red: "#cd3131",
        green: "#0dbc79",
        yellow: "#e5e510",
        blue: "#2472c8",
        magenta: "#bc3fbc",
        cyan: "#11a8cd",
        white: "#e5e5e5",
        brightBlack: "#666666",
        brightRed: "#f14c4c",
        brightGreen: "#23d18b",
        brightYellow: "#f5f543",
        brightBlue: "#3b8eea",
        brightMagenta: "#d670d6",
        brightCyan: "#29b8db",
        brightWhite: "#ffffff",
      },
    });
    const fitAddon = new FitAddon();
    terminal.loadAddon(fitAddon);
    terminal.open(terminalRef.current);
    fitAddon.fit();
    xtermRef.current = terminal;
    fitAddonRef.current = fitAddon;
    terminalRenderedTextRef.current = "";

    const handleInput = (data) => {
      // Ignore terminal escape sequences such as arrow keys; this runner uses line input.
      if (data.startsWith("\u001b")) return;

      for (const character of data) {
        if (!activeProcessRef.current) {
          if (character === "\r") {
            setTerminalText(
              (current) =>
                `${current}No program is running. Press Run or Ctrl+Enter.\r\n`,
            );
          }
          continue;
        }

        if (character === "\n" && lastWasCarriageReturnRef.current) {
          lastWasCarriageReturnRef.current = false;
          continue;
        }

        if (character === "\r" || character === "\n") {
          lastWasCarriageReturnRef.current = character === "\r";
          const line = terminalLineBufferRef.current;
          terminalLineBufferRef.current = "";
          setTerminalText((current) => `${current}\r\n`);
          const payload = JSON.stringify({ type: "stdin", data: `${line}\n` });
          const socket = socketRef.current;
          if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(payload);
          } else {
            pendingInputRef.current.push(payload);
          }
          continue;
        }

        lastWasCarriageReturnRef.current = false;

        if (character === "\u0003") {
          terminalLineBufferRef.current = "";
          setTerminalText((current) => `${current}^C\r\n`);
          const socket = socketRef.current;
          if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ type: "kill" }));
          }
          continue;
        }

        if (character === "\u0004") {
          const socket = socketRef.current;
          if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ type: "stdinClose" }));
          }
          continue;
        }

        if (character === "\u007f" || character === "\b") {
          if (terminalLineBufferRef.current.length > 0) {
            terminalLineBufferRef.current = terminalLineBufferRef.current.slice(
              0,
              -1,
            );
            setTerminalText((current) => `${current}\b \b`);
          }
          continue;
        }

        if (character === "\t" || character >= " ") {
          terminalLineBufferRef.current += character;
          setTerminalText((current) => `${current}${character}`);
        }
      }
    };

    const inputDisposable = terminal.onData(handleInput);
    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => {
          try {
            fitAddon.fit();
          } catch {
            /* Container may be temporarily hidden. */
          }
        })
        : null;
    if (resizeObserver) resizeObserver.observe(terminalRef.current);
    const handleWindowResize = () => {
      try {
        fitAddon.fit();
      } catch {
        /* Ignore transient layout changes. */
      }
    };
    window.addEventListener("resize", handleWindowResize);

    return () => {
      inputDisposable.dispose();
      if (resizeObserver) resizeObserver.disconnect();
      window.removeEventListener("resize", handleWindowResize);
      terminal.dispose();
      if (xtermRef.current === terminal) xtermRef.current = null;
      if (fitAddonRef.current === fitAddon) fitAddonRef.current = null;
      terminalRenderedTextRef.current = "";
    };
  }, [isBottomPanelOpen]);

  useEffect(() => {
    const terminal = xtermRef.current;
    if (!terminal) return;

    const previousText = terminalRenderedTextRef.current;
    if (terminalText.startsWith(previousText)) {
      const addition = terminalText.slice(previousText.length);
      if (addition) terminal.write(addition);
    } else {
      terminal.reset();
      terminal.write(terminalText);
    }
    terminalRenderedTextRef.current = terminalText;
  }, [terminalText, isBottomPanelOpen]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsNativeFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    // Try native fullscreen once when the editor page opens. Most browsers only
    // allow this after a user gesture, so failure is intentionally silent.
    if (!autoFullscreenAttemptedRef.current && !document.fullscreenElement) {
      autoFullscreenAttemptedRef.current = true;
      const page = document.documentElement;
      if (typeof page.requestFullscreen === "function") {
        page.requestFullscreen().catch(() => {
          // Browser permission policy blocked automatic fullscreen.
        });
      }
    }

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      if (toastTimeoutRef.current) window.clearTimeout(toastTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const closeMenuOnOutsideClick = (event) => {
      const target = event.target;
      if (
        target instanceof Element &&
        !target.closest("[data-editor-menu-root]")
      ) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", closeMenuOnOutsideClick);
    return () =>
      document.removeEventListener("mousedown", closeMenuOnOutsideClick);
  }, []);

  const startTerminalResize = useCallback(
    (event) => {
      if (event.button !== 0) return;
      event.preventDefault();
      terminalResizeRef.current = {
        startY: event.clientY,
        startHeight: terminalHeight,
      };
      setIsResizingTerminal(true);
    },
    [terminalHeight],
  );

  useEffect(() => {
    if (!isResizingTerminal) return undefined;

    const previousCursor = document.body.style.cursor;
    const previousUserSelect = document.body.style.userSelect;
    document.body.style.cursor = "row-resize";
    document.body.style.userSelect = "none";

    const handlePointerMove = (event) => {
      const { startY, startHeight } = terminalResizeRef.current;
      const maxHeight = Math.max(
        180,
        Math.min(window.innerHeight * 0.72, window.innerHeight - 180),
      );
      const nextHeight = startHeight + startY - event.clientY;
      setTerminalHeight(
        Math.round(Math.min(maxHeight, Math.max(150, nextHeight))),
      );
    };

    const stopResizing = () => setIsResizingTerminal(false);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", stopResizing);
    window.addEventListener("pointercancel", stopResizing);

    return () => {
      document.body.style.cursor = previousCursor;
      document.body.style.userSelect = previousUserSelect;
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", stopResizing);
      window.removeEventListener("pointercancel", stopResizing);
    };
  }, [isResizingTerminal]);

  const saveCode = useCallback(() => {
    try {
      window.localStorage.setItem(
        getAssignmentStorageKey(activeAssignmentId),
        code,
      );
      showToast(`${activeAssignment.fileName} saved in this browser`);
    } catch {
      showToast("Browser storage is unavailable");
    }
  }, [activeAssignmentId, activeAssignment.fileName, code, showToast]);

  const copyCode = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      showToast("Code copied to clipboard");
    } catch {
      showToast("Clipboard access was blocked by the browser");
    }
  }, [code, showToast]);

  const downloadCode = useCallback(() => {
    const blob = new Blob([code], { type: "text/x-csrc;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = activeAssignment.fileName;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
    showToast(`Downloaded ${activeAssignment.fileName}`);
  }, [activeAssignment.fileName, code, showToast]);

  const selectAllCode = useCallback(() => {
    const editor = editorRef.current;
    const model = editor?.getModel();
    if (!editor || !model || !isFileOpen) return;
    editor.setSelection(model.getFullModelRange());
    editor.focus();
  }, [isFileOpen]);

  const closeFile = useCallback(() => {
    if (!isFileOpen) return;
    stopActiveRun();
    setIsFileOpen(false);
    showToast(`Closed ${activeAssignment.fileName}`);
  }, [activeAssignment.fileName, isFileOpen, showToast, stopActiveRun]);

  const openAssignmentPicker = useCallback(() => {
    setAssignmentSearch("");
    setIsAssignmentPickerOpen(true);
  }, []);

  const loadAssignment = useCallback(
    (assignment) => {
      if (!assignment) return;
      stopActiveRun();
      let savedCode = null;
      try {
        savedCode = window.localStorage.getItem(
          getAssignmentStorageKey(assignment.id),
        );
      } catch {
        // A blocked localStorage should not prevent switching assignments.
      }
      setActiveAssignmentId(assignment.id);
      setCode(savedCode || assignment.code);
      setIsFileOpen(true);
      setIsAssignmentPickerOpen(false);
      setAssignmentSearch("");
      terminalLineBufferRef.current = "";
      setProgramOutput("");
      setProblemOutput("No compiler diagnostics yet.");
      setRunState("idle");
      setActiveBottomTab("TERMINAL");
      setTerminalText(
        `Opened ${assignment.fileName}.\r\nPress Run or Ctrl+Enter to compile and start this program.\r\nWhen the program prompts for input, type directly in this terminal and press Enter.\r\n`,
      );
      showToast(`Opened ${assignment.fileName}`);
    },
    [showToast, stopActiveRun],
  );

  useEffect(() => {
    if (isAssignmentPickerOpen) assignmentSearchRef.current?.focus();
  }, [isAssignmentPickerOpen]);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      } else {
        showToast("Full-screen mode is not supported by this browser");
      }
    } catch {
      showToast("Browser prevented full-screen mode");
    }
  }, [showToast]);

  const resetCode = useCallback(() => {
    stopActiveRun();
    setCode(activeAssignment.code);
    terminalLineBufferRef.current = "";
    setProgramOutput("");
    setProblemOutput("No compiler diagnostics yet.");
    setRunState("idle");
    setTerminalText(
      `Starter code restored for ${activeAssignment.fileName}.\r\nPress Run or Ctrl+Enter to start the program. Type input in this terminal when prompted.\r\n`,
    );
    showToast("Starter program restored");
  }, [activeAssignment, showToast, stopActiveRun]);

  const runCode = useCallback(() => {
    if (activeProcessRef.current || isRunning) return;

    if (socketRef.current) {
      try {
        socketRef.current.close();
      } catch {
        /* Ignore an already closed socket. */
      }
      socketRef.current = null;
    }

    setIsBottomPanelOpen(true);
    setActiveBottomTab("TERMINAL");
    setIsRunning(true);
    setRunState("compiling");
    setProgramOutput("");
    setProblemOutput(`Compiling ${activeAssignment.fileName} with local GCC…`);
    terminalLineBufferRef.current = "";
    pendingInputRef.current = [];
    lastWasCarriageReturnRef.current = false;
    activeProcessRef.current = true;
    const executableName = navigator.platform.toLowerCase().includes("win")
      ? "program.exe"
      : "program";
    const commandText = `> gcc ${activeAssignment.fileName} -o ${executableName}\r\n> ${executableName}\r\n\r\n[Connecting to the local C runner…]\r\n`;
    setTerminalText(commandText);

    let settled = false;
    let sentRunRequest = false;
    let socket;
    try {
      socket = new WebSocket(C_RUNNER_WS_URL);
    } catch (error) {
      activeProcessRef.current = false;
      setIsRunning(false);
      setRunState("error");
      const message = `Could not connect to the local C runner at ${C_RUNNER_WS_URL}. Start c-runner-server.cjs and try again.`;
      setProblemOutput(message);
      setTerminalText(
        (current) => `${current}\r\n[Runner error] ${message}\r\n`,
      );
      return;
    }
    socketRef.current = socket;

    const finishWithConnectionError = (message) => {
      if (settled || socketRef.current !== socket) return;
      settled = true;
      activeProcessRef.current = false;
      setIsRunning(false);
      setRunState("error");
      setProblemOutput(message);
      setTerminalText(
        (current) =>
          `${current}\r\n[Runner error] ${message}\r\n\r\nStart the local runner in a separate terminal with: node c-runner-server.cjs\r\n`,
      );
      socketRef.current = null;
    };

    socket.onopen = () => {
      if (socketRef.current !== socket || sentRunRequest) return;
      sentRunRequest = true;
      socket.send(
        JSON.stringify({
          type: "run",
          fileName: activeAssignment.fileName,
          code,
        }),
      );
      const queuedInput = pendingInputRef.current.splice(0);
      for (const payload of queuedInput) socket.send(payload);
      window.setTimeout(() => xtermRef.current?.focus(), 50);
    };

    socket.onmessage = (event) => {
      if (socketRef.current !== socket) return;
      let message;
      try {
        message = JSON.parse(event.data);
      } catch {
        return;
      }

      if (message.type === "status") {
        setTerminalText((current) => `${current}${String(message.text || "")}`);
        return;
      }

      if (message.type === "compile-output") {
        const chunk = String(message.text || "");
        setTerminalText((current) => `${current}${chunk}`);
        setProblemOutput((current) =>
          current === `Compiling ${activeAssignment.fileName} with local GCC…`
            ? chunk
            : `${current === "No compiler diagnostics." ? "" : current}${chunk}`,
        );
        return;
      }

      if (message.type === "compiled") {
        if (message.success) {
          setProblemOutput((current) =>
            current.startsWith("Compiling ") || current === ""
              ? message.diagnostics || "No compiler diagnostics."
              : current,
          );
          setRunState("running");
        }
        return;
      }

      if (message.type === "stdout") {
        const chunk = String(message.text || "");
        setTerminalText((current) => `${current}${chunk}`);
        setProgramOutput((current) => `${current}${chunk}`);
        return;
      }

      if (message.type === "stderr") {
        const chunk = String(message.text || "");
        setTerminalText((current) => `${current}${chunk}`);
        setProblemOutput(
          (current) =>
            `${current === "No compiler diagnostics." ? "" : current}${chunk}`,
        );
        return;
      }

      if (message.type === "error") {
        settled = true;
        activeProcessRef.current = false;
        setIsRunning(false);
        setRunState("error");
        const text = String(message.message || "The local C runner failed.");
        setProblemOutput(text);
        setTerminalText(
          (current) => `${current}\r\n[Runner error] ${text}\r\n`,
        );
        if (socketRef.current === socket) socketRef.current = null;
        socket.close();
        return;
      }

      if (message.type === "exit") {
        settled = true;
        activeProcessRef.current = false;
        setIsRunning(false);
        const exitCode = Number(message.code ?? 1);
        const succeeded =
          exitCode === 0 && !message.timedOut && message.stage !== "compile";
        setRunState(succeeded ? "success" : "error");
        if (message.timedOut) {
          setProblemOutput(
            "The program exceeded the 15-second execution limit and was stopped.",
          );
        }
        setTerminalText(
          (current) =>
            `${current}\r\n[Process exited with code ${exitCode}]\r\n`,
        );
        if (socketRef.current === socket) socketRef.current = null;
        socket.close();
      }
    };

    socket.onerror = () => {
      if (!settled && socketRef.current === socket) {
        finishWithConnectionError(
          "Cannot reach the local runner. Confirm that GCC is installed and run node c-runner-server.cjs from the project folder.",
        );
      }
    };

    socket.onclose = () => {
      if (!settled && socketRef.current === socket) {
        finishWithConnectionError(
          "The connection to the local C runner closed before the program finished.",
        );
      }
    };
  }, [activeAssignment.fileName, code, isRunning]);

  const runEditorAction = useCallback(
    (actionId) => {
      const editor = editorRef.current;
      if (!editor) {
        showToast("Open a source file first");
        return;
      }
      const action = editor.getAction(actionId);
      if (action) action.run();
      else showToast("That editor command is not available right now");
    },
    [showToast],
  );

  const executeMenuCommand = useCallback(
    (command) => {
      setActiveMenu(null);
      switch (command) {
        case "openAssignmentPicker":
          openAssignmentPicker();
          break;
        case "save":
          saveCode();
          break;
        case "download":
          downloadCode();
          break;
        case "restoreStarter":
          resetCode();
          break;
        case "closeFile":
          closeFile();
          break;
        case "openFile":
          setIsFileOpen(true);
          showToast(`Opened ${activeAssignment.fileName}`);
          break;
        case "closeWorkspace":
          setIsWorkspaceClosed(true);
          setIsMinimized(false);
          break;
        case "undo":
          runEditorAction("undo");
          break;
        case "redo":
          runEditorAction("redo");
          break;
        case "cut":
          runEditorAction("editor.action.clipboardCutAction");
          break;
        case "copy":
          runEditorAction("editor.action.clipboardCopyAction");
          break;
        case "paste":
          runEditorAction("editor.action.clipboardPasteAction");
          break;
        case "find":
          runEditorAction("actions.find");
          break;
        case "replace":
          runEditorAction("editor.action.startFindReplaceAction");
          break;
        case "selectAll":
          selectAllCode();
          break;
        case "commentLine":
          runEditorAction("editor.action.commentLine");
          break;
        case "expandSelection":
          runEditorAction("editor.action.smartSelect.expand");
          break;
        case "shrinkSelection":
          runEditorAction("editor.action.smartSelect.shrink");
          break;
        case "toggleExplorer":
          setIsExplorerOpen((current) => !current);
          break;
        case "togglePanel":
          setIsBottomPanelOpen((current) => !current);
          break;
        case "toggleFullscreen":
          toggleFullscreen();
          break;
        case "toggleMinimap":
          setMinimapEnabled((current) => !current);
          break;
        case "toggleWordWrap":
          setWordWrapEnabled((current) => !current);
          break;
        case "gotoLine":
          runEditorAction("editor.action.gotoLine");
          break;
        case "nextAssignment":
          loadAssignment(ASSIGNMENTS[activeAssignmentId % ASSIGNMENTS.length]);
          break;
        case "previousAssignment":
          loadAssignment(
            ASSIGNMENTS[
            (activeAssignmentId - 2 + ASSIGNMENTS.length) % ASSIGNMENTS.length
            ],
          );
          break;
        case "run":
          runCode();
          break;
        case "clearTerminal":
          setTerminalText(
            `Terminal cleared.\r\nReady to run ${activeAssignment.fileName}. Press Run or Ctrl+Enter.\r\n`,
          );
          setProgramOutput("");
          setProblemOutput("No compiler diagnostics yet.");
          setRunState("idle");
          break;
        case "focusStdin":
          setIsBottomPanelOpen(true);
          window.setTimeout(() => xtermRef.current?.focus(), 80);
          break;
        case "keyboardShortcuts":
          showToast(
            "Run: Ctrl+Enter · Save: Ctrl+S · Assignments: Ctrl+Shift+P · Select code: Ctrl+Alt+Shift+A · Explorer: Ctrl+B · Panel: Ctrl+J",
          );
          break;
        case "about":
          showToast("SE Practical Code Editor · C assignments workspace");
          break;
        default:
          showToast("Command is not available yet");
      }
    },
    [
      activeAssignment.fileName,
      activeAssignmentId,
      closeFile,
      copyCode,
      downloadCode,
      loadAssignment,
      openAssignmentPicker,
      resetCode,
      runCode,
      runEditorAction,
      saveCode,
      selectAllCode,
      showToast,
      toggleFullscreen,
    ],
  );

  const toggleMenu = useCallback((item) => {
    setActiveMenu((current) => (current === item ? null : item));
  }, []);

  useEffect(() => {
    const handleShortcuts = (event) => {
      const commandKey = event.ctrlKey || event.metaKey;
      const key = event.key.toLowerCase();

      if (event.key === "Escape" && isAssignmentPickerOpen) {
        event.preventDefault();
        setIsAssignmentPickerOpen(false);
        return;
      }

      if (commandKey && event.key === "Enter") {
        event.preventDefault();
        runCode();
        return;
      }
      if (commandKey && key === "s") {
        event.preventDefault();
        saveCode();
        return;
      }

      // Hidden assignment picker: Ctrl/Cmd + Alt + Shift + P.
      if (commandKey && event.altKey && event.shiftKey && key === "p") {
        event.preventDefault();
        openAssignmentPicker();
        return;
      }

      // Additional assignment picker shortcut: Ctrl/Cmd + Shift + P.
      if (commandKey && event.shiftKey && !event.altKey && key === "p") {
        event.preventDefault();
        openAssignmentPicker();
        return;
      }

      if (event.key === "Escape" && activeMenu) {
        event.preventDefault();
        setActiveMenu(null);
        return;
      }

      // Deliberately undocumented shortcut: Ctrl/Cmd + Alt + Shift + A selects the entire source file.
      if (commandKey && event.altKey && event.shiftKey && key === "a") {
        event.preventDefault();
        selectAllCode();
        return;
      }

      if (commandKey && key === "b") {
        event.preventDefault();
        setIsExplorerOpen((current) => !current);
        return;
      }
      if (commandKey && key === "j") {
        event.preventDefault();
        setIsBottomPanelOpen((current) => !current);
        return;
      }
      if (event.altKey && !event.ctrlKey && !event.metaKey && key === "z") {
        event.preventDefault();
        setWordWrapEnabled((current) => !current);
        return;
      }
      if (commandKey && key === "g") {
        event.preventDefault();
        editorRef.current?.getAction("editor.action.gotoLine")?.run();
        return;
      }
      if (commandKey && key === "h") {
        event.preventDefault();
        editorRef.current
          ?.getAction("editor.action.startFindReplaceAction")
          ?.run();
        return;
      }

      // Close the active source tab without closing the browser tab.
      if (event.ctrlKey && event.key === "F4" && isFileOpen) {
        event.preventDefault();
        closeFile();
      }
    };

    window.addEventListener("keydown", handleShortcuts);
    return () => window.removeEventListener("keydown", handleShortcuts);
  }, [
    activeMenu,
    closeFile,
    isAssignmentPickerOpen,
    isFileOpen,
    openAssignmentPicker,
    runCode,
    saveCode,
    selectAllCode,
  ]);

  const handleEditorMount = (editor, monaco) => {
    editorRef.current = editor;
    setCursorPosition({ line: 1, column: 1 });
    editor.onDidChangeCursorPosition((event) => {
      setCursorPosition({
        line: event.position.lineNumber,
        column: event.position.column,
      });
    });
    if (monaco) {
      editor.addCommand(
        monaco.KeyMod.CtrlCmd |
        monaco.KeyMod.Alt |
        monaco.KeyMod.Shift |
        monaco.KeyCode.KeyA,
        () => {
          const model = editor.getModel();
          if (model) editor.setSelection(model.getFullModelRange());
          editor.focus();
        },
      );
      editor.addCommand(
        monaco.KeyMod.CtrlCmd |
        monaco.KeyMod.Alt |
        monaco.KeyMod.Shift |
        monaco.KeyCode.KeyP,
        () => openAssignmentPicker(),
      );
      editor.addCommand(
        monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyP,
        () => openAssignmentPicker(),
      );
    }
  };

  const activeActivityItem = activityItems.find(
    (item) => item.id === activeActivity,
  );
  const lineCount = code.split("\n").length;
  const filteredAssignments = ASSIGNMENTS.filter((assignment) =>
    `${assignment.id} ${assignment.title} ${assignment.fileName}`
      .toLowerCase()
      .includes(assignmentSearch.toLowerCase().trim()),
  );

  if (isWorkspaceClosed) {
    return (
      <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#111111] p-4 text-[#d4d4d4]">
        <div className="w-full max-w-md rounded-xl border border-[#393939] bg-[#1e1e1e] p-6 text-center shadow-2xl">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#252526]">
            <Code2 size={24} className="text-[#42a5f5]" />
          </div>
          <h1 className="text-base font-semibold text-white">
            Workspace closed
          </h1>
          <p className="mt-2 text-sm leading-6 text-[#999]">
            Your source files remain saved in this browser. Reopen the workspace
            to continue editing.
          </p>
          <button
            type="button"
            onClick={() => setIsWorkspaceClosed(false)}
            className="mt-5 rounded-md bg-[#0e639c] px-4 py-2 text-sm font-medium text-white hover:bg-[#1177bb]"
          >
            Reopen workspace
          </button>
        </div>
      </div>
    );
  }

  if (isMinimized) {
    return (
      <div className="fixed inset-0 z-[200] flex items-end justify-start bg-[#111111] p-4 text-[#d4d4d4]">
        <button
          type="button"
          onClick={() => setIsMinimized(false)}
          className="flex items-center gap-3 rounded-lg border border-[#454545] bg-[#252526] px-4 py-3 shadow-xl hover:bg-[#333]"
          title="Restore workspace"
        >
          <Code2 size={18} className="text-[#42a5f5]" />
          <span className="text-left">
            <span className="block text-xs font-semibold text-white">
              se-practical
            </span>
            <span className="block text-[10px] text-[#999]">
              Workspace minimized · Click to restore
            </span>
          </span>
          <Maximize2 size={14} className="ml-4 text-[#999]" />
        </button>
      </div>
    );
  }

  return (
    <div className="se-code-editor-root fixed inset-0 z-50 h-[100dvh] w-screen min-w-0 overflow-hidden bg-[#1e1e1e] text-[#cccccc]">
      <style>{`
        /* Consistent dark scrollbars for every scrollable area in the editor. */
        .se-code-editor-root {
          color-scheme: dark;
          scrollbar-color: #454545 #1e1e1e;
          scrollbar-width: thin;
          overscroll-behavior: contain;
        }

        .se-code-editor-root * {
          scrollbar-color: #454545 #1e1e1e;
          scrollbar-width: thin;
        }

        /* Keep the interface clean: no browser focus outlines or focus rings. */
        .se-code-editor-root *:focus,
        .se-code-editor-root *:focus-visible {
          outline: none !important;
          box-shadow: none !important;
        }

        .se-code-editor-root button,
        .se-code-editor-root input,
        .se-code-editor-root textarea,
        .se-code-editor-root select {
          outline: none !important;
        }

        /* Native wheel scrolling stays inside the pane under the mouse pointer. */
        .se-code-editor-root [class*="overflow-auto"],
        .se-code-editor-root [class*="overflow-y-auto"],
        .se-code-editor-root [class*="overflow-x-auto"],
        .se-code-editor-root [role="menu"],
        .se-code-editor-root [role="dialog"] {
          overscroll-behavior: contain;
          -webkit-overflow-scrolling: touch;
        }

        .se-code-editor-root *::-webkit-scrollbar {
          width: 10px;
          height: 10px;
        }

        .se-code-editor-root *::-webkit-scrollbar-track,
        .se-code-editor-root *::-webkit-scrollbar-corner {
          background: #1e1e1e;
        }

        .se-code-editor-root *::-webkit-scrollbar-thumb {
          min-height: 28px;
          background: #414141;
          border: 2px solid #1e1e1e;
          border-radius: 6px;
        }

        .se-code-editor-root *::-webkit-scrollbar-thumb:hover {
          background: #5a5a5a;
        }

        .se-code-editor-root *::-webkit-scrollbar-thumb:active {
          background: #007acc;
        }

        /* Monaco uses custom scrollbar elements rather than browser scrollbars. */
        .se-code-editor-root .monaco-editor .monaco-scrollable-element > .scrollbar,
        .se-code-editor-root .monaco-editor .monaco-scrollable-element > .scrollbar > .slider {
          transition: background-color 120ms ease;
        }

        .se-code-editor-root .monaco-editor .monaco-scrollable-element > .scrollbar {
          background: #1e1e1e !important;
        }

        .se-code-editor-root .monaco-editor .monaco-scrollable-element > .scrollbar > .slider {
          background: #414141 !important;
          border-radius: 5px !important;
        }

        .se-code-editor-root .monaco-editor .monaco-scrollable-element > .scrollbar:hover > .slider,
        .se-code-editor-root .monaco-editor .monaco-scrollable-element > .scrollbar > .slider:hover {
          background: #5a5a5a !important;
        }

        .se-code-editor-root .monaco-editor .monaco-scrollable-element > .scrollbar > .slider:active {
          background: #007acc !important;
        }
      `}</style>
      <div className="flex h-full w-full min-w-0 flex-col overflow-hidden border border-[#343434] bg-[#1e1e1e] text-[13px]">
        {/* Application title bar */}
        <header className="flex h-10 shrink-0 items-center justify-between border-b border-[#2b2b2b] bg-[#181818] pl-3">
          <div className="flex min-w-0 items-center gap-3">
            <Code2 size={17} className="shrink-0 text-[#42a5f5]" />
            <span className="truncate text-xs text-[#c5c5c5]">
              se-practical
            </span>
          </div>

          <div className="hidden items-center gap-1 rounded-md border border-[#363636] bg-[#222222] px-3 py-1 text-[11px] text-[#a9a9a9] md:flex">
            <span>{activeAssignment.fileName}</span>
            <span className="text-[#666]">—</span>
            <span>se-practical</span>
          </div>

          <div className="flex h-full items-center gap-1">
            <span
              className={`mr-1 hidden items-center gap-1 text-[11px] sm:flex ${runState === "success" ? "text-emerald-400" : runState === "error" ? "text-red-400" : "text-[#8a8a8a]"}`}
            >
              <Circle size={7} fill="currentColor" />
              {runState === "running"
                ? "Running"
                : runState === "success"
                  ? "Last run passed"
                  : runState === "error"
                    ? "Last run failed"
                    : "Ready"}
            </span>
            <IconButton
              title="Save (Ctrl+S)"
              onClick={saveCode}
              className="mr-1 h-7 w-7 text-[#b9b9b9] hover:bg-[#333] hover:text-white"
            >
              <Save size={15} />
            </IconButton>
            <div className="ml-1 flex h-full border-l border-[#303030]">
              <button
                type="button"
                title="Minimize workspace"
                aria-label="Minimize workspace"
                onClick={() => setIsMinimized(true)}
                className="flex h-full w-11 items-center justify-center text-[#bdbdbd] transition-colors hover:bg-[#333] hover:text-white"
              >
                <Minus size={15} />
              </button>
              <button
                type="button"
                title={
                  isNativeFullscreen
                    ? "Restore from full screen"
                    : "Maximize workspace"
                }
                aria-label={
                  isNativeFullscreen
                    ? "Restore workspace"
                    : "Maximize workspace"
                }
                onClick={toggleFullscreen}
                className="flex h-full w-11 items-center justify-center text-[#bdbdbd] transition-colors hover:bg-[#333] hover:text-white"
              >
                {isNativeFullscreen ? (
                  <Minimize2 size={14} />
                ) : (
                  <Square size={13} />
                )}
              </button>
              <button
                type="button"
                title="Close workspace"
                aria-label="Close workspace"
                onClick={() => setIsWorkspaceClosed(true)}
                className="flex h-full w-12 items-center justify-center text-[#bdbdbd] transition-colors hover:bg-[#c42b1c] hover:text-white"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </header>

        {/* Menu and run toolbar */}
        <div className="flex h-10 shrink-0 items-center justify-between border-b border-[#2b2b2b] bg-[#1e1e1e] px-2 sm:px-3">
          <div
            data-editor-menu-root="true"
            className="flex min-w-0 items-center gap-0.5 overflow-visible"
          >
            {Object.entries(MENU_CONFIG).map(([item, menuItems]) => (
              <div key={item} className="relative hidden sm:block">
                <button
                  type="button"
                  aria-haspopup="menu"
                  aria-expanded={activeMenu === item}
                  onClick={() => toggleMenu(item)}
                  onMouseEnter={() => {
                    if (activeMenu) setActiveMenu(item);
                  }}
                  className={`rounded px-2 py-1 text-[11px] transition-colors ${activeMenu === item ? "bg-[#37373d] text-white" : "text-[#bdbdbd] hover:bg-[#333] hover:text-white"}`}
                >
                  {item}
                </button>
                {activeMenu === item && (
                  <div
                    role="menu"
                    aria-label={`${item} menu`}
                    className="absolute left-0 top-full z-[80] mt-1 min-w-[250px] overflow-hidden rounded-md border border-[#454545] bg-[#252526] py-1 shadow-2xl"
                  >
                    {menuItems.map((menuItem, index) =>
                      menuItem.separator ? (
                        <div
                          key={`${item}-separator-${index}`}
                          className="my-1 border-t border-[#3b3b3b]"
                        />
                      ) : (
                        <button
                          key={`${item}-${menuItem.command}`}
                          type="button"
                          role="menuitem"
                          onClick={() => executeMenuCommand(menuItem.command)}
                          className="flex w-full items-center justify-between gap-5 px-3 py-1.5 text-left text-[11px] text-[#d4d4d4] hover:bg-[#094771] hover:text-white"
                        >
                          <span>{menuItem.label}</span>
                          {menuItem.shortcut && (
                            <span className="shrink-0 text-[10px] text-[#969696]">
                              {menuItem.shortcut}
                            </span>
                          )}
                        </button>
                      ),
                    )}
                  </div>
                )}
              </div>
            ))}
            <span className="ml-1 truncate text-[11px] text-[#666] sm:hidden">
              File&nbsp; / &nbsp;Run
            </span>
          </div>

          <div className="flex shrink-0 items-center gap-1.5">
            <IconButton
              title={isExplorerOpen ? "Hide explorer" : "Show explorer"}
              onClick={() => setIsExplorerOpen((current) => !current)}
              className="h-7 w-7 text-[#b9b9b9] hover:bg-[#333] hover:text-white"
            >
              <Files size={14} />
            </IconButton>
            <IconButton
              title={
                isBottomPanelOpen
                  ? "Hide terminal panel"
                  : "Show terminal panel"
              }
              onClick={() => setIsBottomPanelOpen((current) => !current)}
              className="h-7 w-7 text-[#b9b9b9] hover:bg-[#333] hover:text-white"
            >
              <SquareTerminal size={14} />
            </IconButton>
            <IconButton
              title="Copy code"
              onClick={copyCode}
              className="h-7 w-7 text-[#b9b9b9] hover:bg-[#333] hover:text-white"
            >
              <Copy size={14} />
            </IconButton>
            <IconButton
              title={`Download ${activeAssignment.fileName}`}
              onClick={downloadCode}
              className="h-7 w-7 text-[#b9b9b9] hover:bg-[#333] hover:text-white"
            >
              <Download size={14} />
            </IconButton>
            <IconButton
              title="Restore starter code"
              onClick={resetCode}
              className="h-7 w-7 text-[#b9b9b9] hover:bg-[#333] hover:text-white"
            >
              <RotateCcw size={14} />
            </IconButton>
            <IconButton
              title="Run (Ctrl+Enter)"
              onClick={runCode}
              disabled={isRunning}
              className="h-7 rounded-md bg-[#16834a] px-2.5 text-white hover:bg-[#1a9955] sm:px-3"
            >
              {isRunning ? (
                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              ) : (
                <Play size={14} fill="currentColor" />
              )}
              <span className="text-[11px] font-semibold">
                {isRunning ? "Running" : "Run"}
              </span>
            </IconButton>
          </div>
        </div>

        <div className="flex min-h-0 flex-1 overflow-hidden">
          {/* Activity bar */}
          <aside
            className="hidden w-12 shrink-0 flex-col items-center justify-between border-r border-[#2b2b2b] bg-[#181818] py-2 sm:flex"
            aria-label="Activity bar"
          >
            <div className="flex flex-col items-center gap-1">
              {activityItems.map(({ id, label, Icon }) => (
                <IconButton
                  key={id}
                  title={label}
                  onClick={() => {
                    if (id === "explorer" && activeActivity === "explorer") {
                      setIsExplorerOpen((current) => !current);
                    } else {
                      setActiveActivity(id);
                      setIsExplorerOpen(true);
                    }
                  }}
                  className={`relative h-10 w-10 rounded-none ${activeActivity === id ? "text-white" : "text-[#858585] hover:text-white"}`}
                >
                  {activeActivity === id && (
                    <span className="absolute left-0 top-1 bottom-1 w-[2px] bg-[#42a5f5]" />
                  )}
                  <Icon size={21} strokeWidth={1.6} />
                </IconButton>
              ))}
            </div>
            <div className="flex flex-col gap-1">
              <IconButton
                title="Manage settings"
                onClick={() =>
                  showToast("Editor settings are managed in CodeEditor.jsx")
                }
                className="h-10 w-10 text-[#858585] hover:text-white"
              >
                <Settings size={20} strokeWidth={1.6} />
              </IconButton>
              <IconButton
                title="Help"
                onClick={() =>
                  showToast(
                    "Run with Ctrl+Enter, then type input directly in the terminal and press Enter",
                  )
                }
                className="h-10 w-10 text-[#858585] hover:text-white"
              >
                <CircleHelp size={20} strokeWidth={1.6} />
              </IconButton>
            </div>
          </aside>

          {/* Explorer and side views */}
          <aside
            className={`${isExplorerOpen ? "hidden md:flex" : "hidden"} w-[210px] shrink-0 flex-col border-r border-[#2b2b2b] bg-[#181818] lg:w-[240px]`}
          >
            <div className="flex h-9 items-center justify-between px-4 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#bbbbbb]">
              <span>{activeActivityItem?.label || "Explorer"}</span>
              <ChevronDown size={14} className="text-[#858585]" />
            </div>

            {activeActivity === "explorer" ? (
              <div className="min-h-0 flex-1 overflow-y-auto py-1">
                <div className="flex h-7 items-center gap-1 px-2 font-semibold text-[#c5c5c5]">
                  <ChevronDown size={14} />
                  <FolderOpen size={15} className="text-[#dcb67a]" />
                  <span className="text-[11px]">SE-PRACTICAL</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsFileOpen(true)}
                  className={`flex h-7 w-full items-center gap-2 border-l-2 pl-7 pr-2 text-left ${isFileOpen ? "border-[#42a5f5] bg-[#37373d] text-[#e5e5e5]" : "border-transparent text-[#bdbdbd] hover:bg-[#2a2d2e]"}`}
                >
                  <FileCode2 size={15} className="text-[#6cb6ff]" />
                  <span>{activeAssignment.fileName}</span>
                  <span className="ml-auto text-[10px] text-[#777]">C</span>
                </button>
                <div className="mt-4 border-t border-[#2b2b2b] px-3 py-3">
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#8f8f8f]">
                    Outline
                  </p>
                  {getFunctionNames(code).map((name) => (
                    <button
                      key={name}
                      type="button"
                      onClick={() => {
                        const match = code
                          .split("\n")
                          .findIndex((line) =>
                            new RegExp(`\\b${name}\\s*\\(`).test(line),
                          );
                        if (match >= 0 && editorRef.current) {
                          editorRef.current.revealLineInCenter(match + 1);
                          editorRef.current.setPosition({
                            lineNumber: match + 1,
                            column: 1,
                          });
                          editorRef.current.focus();
                        }
                      }}
                      className="flex h-6 w-full items-center gap-2 rounded px-1 text-left text-[11px] text-[#a9a9a9] hover:bg-[#2a2d2e] hover:text-white"
                    >
                      <span className="text-[#c586c0]">ƒ</span>
                      {name}()
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="min-h-0 flex-1 p-3 text-[11px] text-[#a1a1a1]">
                {activeActivity === "search" ? (
                  <>
                    <label className="mb-2 block text-[10px] font-semibold uppercase tracking-wider">
                      Search in file
                    </label>
                    <input
                      type="text"
                      placeholder="Search is available in editor…"
                      onKeyDown={(event) => {
                        if (event.key === "Enter" && editorRef.current) {
                          editorRef.current.getAction("actions.find")?.run();
                        }
                      }}
                      className="w-full rounded border border-[#3c3c3c] bg-[#252526] px-2 py-1.5 text-[#ddd] outline-none focus:border-[#007fd4]"
                    />
                    <p className="mt-3 leading-5">
                      Press Ctrl+F while editing to find text.
                    </p>
                  </>
                ) : activeActivity === "source" ? (
                  <>
                    <p className="mb-2 font-semibold text-[#ccc]">
                      Source Control
                    </p>
                    <p className="leading-5">
                      No source control provider is active for this workspace.
                    </p>
                  </>
                ) : activeActivity === "run" ? (
                  <>
                    <p className="mb-2 font-semibold text-[#ccc]">
                      Run and Debug
                    </p>
                    <button
                      type="button"
                      onClick={runCode}
                      disabled={isRunning}
                      className="mt-1 flex items-center gap-2 rounded bg-[#16834a] px-2 py-1.5 text-white hover:bg-[#1a9955] disabled:opacity-50"
                    >
                      <Play size={13} /> Run
                    </button>
                    <p className="mt-3 leading-5">
                      Compilation and execution happen in a remote sandbox.
                    </p>
                  </>
                ) : (
                  <>
                    <p className="mb-2 font-semibold text-[#ccc]">Extensions</p>
                    <p className="leading-5">
                      No extensions are installed in this workspace.
                    </p>
                  </>
                )}
              </div>
            )}

            <div className="border-t border-[#2b2b2b] px-3 py-2 text-[10px] text-[#858585]">
              <div className="flex items-center justify-between">
                <span>OPEN EDITORS</span>
                <ChevronDown size={13} />
              </div>
              <button
                type="button"
                onClick={() => setIsFileOpen(true)}
                className="mt-2 flex w-full items-center gap-2 rounded px-1 py-1 text-left text-[#bdbdbd] hover:bg-[#2a2d2e]"
              >
                <FileCode2 size={13} className="text-[#6cb6ff]" />{" "}
                {activeAssignment.fileName}{" "}
                {isFileOpen && (
                  <span className="ml-auto text-[10px] text-[#777]">●</span>
                )}
              </button>
            </div>
          </aside>

          {/* Editor and terminal workspace */}
          <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
            <div className="flex h-9 shrink-0 items-stretch border-b border-[#2b2b2b] bg-[#181818]">
              {isFileOpen ? (
                <div className="group flex items-center gap-2 border-t border-t-[#42a5f5] bg-[#1e1e1e] px-3 text-[#e5e5e5]">
                  <FileCode2 size={15} className="text-[#6cb6ff]" />
                  <span>{activeAssignment.fileName}</span>
                  <span className="ml-1 text-[10px] text-[#888]">C</span>
                  <button
                    type="button"
                    title="Close editor tab (Ctrl+F4)"
                    aria-label={`Close ${activeAssignment.fileName}`}
                    onClick={closeFile}
                    className="ml-1 rounded p-0.5 text-[#888] hover:bg-[#333] hover:text-white"
                  >
                    <X size={12} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center px-3 text-[11px] text-[#777]">
                  No open editors
                </div>
              )}
              <div className="flex flex-1 items-center justify-end gap-1 px-2 text-[#777]">
                <IconButton
                  title={
                    isBottomPanelOpen
                      ? "Hide bottom panel"
                      : "Show bottom panel"
                  }
                  onClick={() => setIsBottomPanelOpen((current) => !current)}
                  className="h-7 w-7 hover:bg-[#333] hover:text-white"
                >
                  <SquareTerminal size={14} />
                </IconButton>
                <IconButton
                  title="Editor actions"
                  onClick={() =>
                    showToast(`${activeAssignment.fileName} · C source file`)
                  }
                  className="h-7 w-7 hover:bg-[#333] hover:text-white"
                >
                  <ChevronDown size={14} />
                </IconButton>
              </div>
            </div>

            {isFileOpen && (
              <div className="flex h-7 shrink-0 items-center gap-1.5 border-b border-[#2b2b2b] bg-[#1e1e1e] px-3 text-[11px] text-[#858585]">
                <span>SE-PRACTICAL</span>
                <ChevronRight size={12} />
                <FileCode2 size={13} className="text-[#6cb6ff]" />
                <span className="text-[#c5c5c5]">
                  {activeAssignment.fileName}
                </span>
                <span className="ml-auto hidden text-[10px] sm:inline">
                  C Language
                </span>
              </div>
            )}

            {isFileOpen ? (
              <section
                className="relative min-h-0 min-w-0 flex-1 bg-[#1e1e1e]"
                aria-label="C code editor"
              >
                <Editor
                  height="100%"
                  language="c"
                  theme="vs-dark"
                  value={code}
                  onChange={(value) => setCode(value ?? "")}
                  onMount={handleEditorMount}
                  loading={
                    <div className="p-5 text-xs text-[#888]">
                      Loading code editor…
                    </div>
                  }
                  options={{
                    automaticLayout: true,
                    fontFamily:
                      'Consolas, "Cascadia Code", "Courier New", monospace',
                    fontSize: 13,
                    lineHeight: 21,
                    minimap: { enabled: minimapEnabled, scale: 1 },
                    padding: { top: 12, bottom: 16 },
                    scrollBeyondLastLine: false,
                    smoothScrolling: true,
                    mouseWheelScrollSensitivity: 1,
                    fastScrollSensitivity: 5,
                    cursorBlinking: "smooth",
                    cursorSmoothCaretAnimation: "on",
                    renderLineHighlight: "all",
                    roundedSelection: false,
                    lineNumbers: "on",
                    glyphMargin: true,
                    folding: true,
                    foldingHighlight: true,
                    bracketPairColorization: { enabled: true },
                    guides: { indentation: true, bracketPairs: true },
                    wordWrap: wordWrapEnabled ? "on" : "off",
                    tabSize: 4,
                    insertSpaces: true,
                    autoIndent: "full",
                    matchBrackets: "always",
                    suggestOnTriggerCharacters: true,
                    quickSuggestions: true,
                    contextmenu: true,
                    overviewRulerBorder: false,
                    hideCursorInOverviewRuler: true,
                    scrollbar: {
                      verticalScrollbarSize: 10,
                      horizontalScrollbarSize: 10,
                      handleMouseWheel: true,
                      alwaysConsumeMouseWheel: true,
                    },
                  }}
                />
              </section>
            ) : (
              <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-3 bg-[#1e1e1e] text-center">
                <FileCode2 size={30} className="text-[#777]" />
                <p className="text-sm text-[#c5c5c5]">No editor is open</p>
                <button
                  type="button"
                  onClick={() => setIsFileOpen(true)}
                  className="rounded border border-[#454545] px-3 py-1.5 text-xs text-[#d4d4d4] hover:bg-[#2a2d2e]"
                >
                  Open {activeAssignment.fileName}
                </button>
              </div>
            )}

            {/* Drag handle: adjust the height of the bottom panel. */}
            {isBottomPanelOpen && (
              <div
                role="separator"
                aria-orientation="horizontal"
                aria-label="Resize terminal panel"
                aria-valuemin={150}
                aria-valuemax={Math.round(
                  Math.min(
                    typeof window !== "undefined"
                      ? window.innerHeight * 0.72
                      : 720,
                    typeof window !== "undefined"
                      ? window.innerHeight - 180
                      : 820,
                  ),
                )}
                aria-valuenow={terminalHeight}
                tabIndex={0}
                onPointerDown={startTerminalResize}
                onDoubleClick={() => setTerminalHeight(250)}
                onKeyDown={(event) => {
                  if (event.key === "ArrowUp") {
                    event.preventDefault();
                    setTerminalHeight((height) =>
                      Math.min(
                        Math.round(window.innerHeight * 0.72),
                        height + 20,
                      ),
                    );
                  } else if (event.key === "ArrowDown") {
                    event.preventDefault();
                    setTerminalHeight((height) => Math.max(150, height - 20));
                  } else if (event.key === "Home") {
                    event.preventDefault();
                    setTerminalHeight(150);
                  } else if (event.key === "End") {
                    event.preventDefault();
                    setTerminalHeight(
                      Math.round(
                        Math.min(
                          window.innerHeight * 0.72,
                          window.innerHeight - 180,
                        ),
                      ),
                    );
                  }
                }}
                title="Drag to resize terminal · Double-click to reset · Use arrow keys to adjust"
                className={`group relative z-10 flex h-[6px] shrink-0 cursor-row-resize touch-none items-center justify-center bg-[#181818] transition-colors hover:bg-[#007acc] ${isResizingTerminal ? "bg-[#007acc]" : ""}`}
              >
                <span className="h-px w-12 rounded-full bg-[#555] transition-colors group-hover:bg-[#d4d4d4]" />
              </div>
            )}

            {/* Bottom panel: a single interactive terminal stream */}
            {isBottomPanelOpen && (
              <section
                className="flex min-h-[150px] shrink-0 flex-col border-t border-[#343434] bg-[#181818]"
                style={{ height: `${terminalHeight}px`, flex: "0 0 auto" }}
                aria-label="Terminal panel"
              >
                <div className="flex h-9 shrink-0 items-center justify-between border-b border-[#2b2b2b] px-3">
                  <div className="flex h-full items-stretch gap-4 overflow-x-auto">
                    {["PROBLEMS", "OUTPUT", "TERMINAL"].map((tab) => (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => setActiveBottomTab(tab)}
                        className={`relative shrink-0 text-[10px] font-semibold tracking-[0.08em] transition-colors ${activeBottomTab === tab ? "text-white" : "text-[#858585] hover:text-[#d4d4d4]"}`}
                      >
                        {tab}
                        {tab === "PROBLEMS" && runState === "error" && (
                          <span className="ml-1 rounded-full bg-[#a1260d] px-1.5 py-0.5 text-[9px] text-white">
                            !
                          </span>
                        )}
                        {activeBottomTab === tab && (
                          <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#42a5f5]" />
                        )}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-1">
                    {isRunning && (
                      <span className="mr-2 text-[10px] text-[#d7ba7d]">
                        {runState === "compiling" ? "Compiling…" : "Running…"}
                      </span>
                    )}
                    <IconButton
                      title="Clear terminal output"
                      onClick={() => {
                        setTerminalText(
                          `Terminal cleared.\r\nReady to run ${activeAssignment.fileName}. Press Run or Ctrl+Enter.\r\n`,
                        );
                        setProgramOutput("");
                        setProblemOutput("No compiler diagnostics yet.");
                        setRunState("idle");
                      }}
                      className="h-6 w-6 text-[#858585] hover:bg-[#333] hover:text-white"
                    >
                      <RotateCcw size={12} />
                    </IconButton>
                    <IconButton
                      title="Close terminal panel"
                      onClick={() => setIsBottomPanelOpen(false)}
                      className="h-6 w-6 text-[#858585] hover:bg-[#333] hover:text-white"
                    >
                      <X size={13} />
                    </IconButton>
                    <IconButton
                      title="Run"
                      onClick={runCode}
                      disabled={isRunning}
                      className="h-6 w-6 text-[#858585] hover:bg-[#333] hover:text-white"
                    >
                      <Play size={13} />
                    </IconButton>
                  </div>
                </div>

                <div className="flex min-h-0 flex-1 flex-col">
                  <div className="flex h-7 shrink-0 items-center gap-2 px-3 text-[10px] text-[#8c8c8c]">
                    {activeBottomTab === "TERMINAL" ? (
                      <Terminal size={13} />
                    ) : activeBottomTab === "OUTPUT" ? (
                      <SquareTerminal size={13} />
                    ) : (
                      <Bug size={13} />
                    )}
                    <span>
                      {activeBottomTab === "TERMINAL"
                        ? "Local GCC Terminal"
                        : activeBottomTab === "OUTPUT"
                          ? "Program stdout"
                          : "Compiler diagnostics"}
                    </span>
                    <span className="ml-auto text-[10px] text-[#666]">
                      {activeAssignment.fileName}
                    </span>
                    {activeBottomTab === "TERMINAL" && (
                      <span className="hidden text-[9px] text-[#777] sm:inline">
                        Type directly here · Enter sends input · Ctrl+C stops
                        the run
                      </span>
                    )}
                  </div>

                  <div
                    className={`${activeBottomTab === "TERMINAL" ? "block" : "hidden"} min-h-0 flex-1 overflow-hidden px-2 pb-2 pt-1`}
                  >
                    <div
                      ref={terminalRef}
                      aria-label="Interactive program terminal"
                      className="h-full min-h-0 w-full overflow-hidden rounded-sm bg-[#181818] font-mono text-[12px]"
                    />
                  </div>

                  {activeBottomTab === "OUTPUT" && (
                    <div className="min-h-0 flex-1 overflow-auto px-3 pb-3 font-mono text-[11px] leading-[1.65] sm:px-4">
                      <pre className="whitespace-pre-wrap break-words text-[#d4d4d4]">
                        {programOutput ||
                          "Program output will appear here after you run the code."}
                      </pre>
                    </div>
                  )}

                  {activeBottomTab === "PROBLEMS" && (
                    <div className="min-h-0 flex-1 overflow-auto px-3 pb-3 font-mono text-[11px] leading-[1.65] sm:px-4">
                      <pre
                        className={`whitespace-pre-wrap break-words ${runState === "error" ? "text-[#f48771]" : "text-[#a8c99a]"}`}
                      >
                        {problemOutput}
                      </pre>
                    </div>
                  )}
                </div>
              </section>
            )}
          </main>
        </div>

        {/* Status bar */}
        <footer className="flex h-[22px] shrink-0 items-center justify-between bg-[#007acc] px-2 text-[10px] text-white">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex shrink-0 items-center gap-1">
              <FileCode2 size={12} /> {activeAssignment.fileName}
            </span>
            <span className="hidden items-center gap-1 sm:flex">
              <Check size={12} />{" "}
              {runState === "success"
                ? "Execution successful"
                : runState === "error"
                  ? "Execution failed"
                  : runState === "compiling"
                    ? "Compiling C program"
                    : runState === "running"
                      ? "Running C program"
                      : "Ready"}
            </span>
            <span className="hidden md:inline">UTF-8</span>
            <span className="hidden md:inline">LF</span>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <span>
              Ln {cursorPosition.line}, Col {cursorPosition.column}
            </span>
            <span className="hidden sm:inline">C</span>
            <span className="hidden items-center gap-1 sm:flex">
              <Circle size={8} /> {lineCount} lines
            </span>
          </div>
        </footer>

        {toast && (
          <div
            role="status"
            className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 rounded-md border border-[#454545] bg-[#252526] px-4 py-2 text-xs text-[#ededed] shadow-xl"
          >
            {toast}
          </div>
        )}

        {isAssignmentPickerOpen && (
          <div
            className="fixed inset-0 z-[100] flex items-start justify-center bg-black/55 px-4 pt-[12vh] backdrop-blur-[2px]"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget)
                setIsAssignmentPickerOpen(false);
            }}
          >
            <section
              role="dialog"
              aria-modal="true"
              aria-labelledby="assignment-picker-title"
              className="w-full max-w-2xl overflow-hidden rounded-lg border border-[#454545] bg-[#252526] shadow-2xl"
            >
              <h2 id="assignment-picker-title" className="sr-only">
                Select an assignment
              </h2>
              <div className="flex items-center gap-2 border-b border-[#3c3c3c] px-4 py-3">
                <Search size={15} className="shrink-0 text-[#858585]" />
                <input
                  ref={assignmentSearchRef}
                  value={assignmentSearch}
                  onChange={(event) => setAssignmentSearch(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && filteredAssignments[0])
                      loadAssignment(filteredAssignments[0]);
                    if (event.key === "Escape")
                      setIsAssignmentPickerOpen(false);
                  }}
                  placeholder="Select an assignment…"
                  aria-label="Search assignments"
                  className="min-w-0 flex-1 bg-transparent text-sm text-[#e5e5e5] outline-none placeholder:text-[#858585]"
                />
                <button
                  type="button"
                  onClick={() => setIsAssignmentPickerOpen(false)}
                  aria-label="Close assignment picker"
                  className="rounded p-1 text-[#858585] hover:bg-[#3c3c3c] hover:text-white"
                >
                  <X size={15} />
                </button>
              </div>
              <div className="max-h-[58vh] overflow-y-auto py-1">
                {filteredAssignments.length ? (
                  filteredAssignments.map((assignment) => (
                    <button
                      key={assignment.id}
                      type="button"
                      onClick={() => loadAssignment(assignment)}
                      className={`flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-[#2a2d2e] ${activeAssignmentId === assignment.id ? "bg-[#37373d]" : ""}`}
                    >
                      <span className="mt-0.5 flex h-7 w-8 shrink-0 items-center justify-center rounded border border-[#454545] bg-[#1e1e1e] font-mono text-[11px] text-[#bdbdbd]">
                        {String(assignment.id).padStart(2, "0")}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[12px] leading-5 text-[#e5e5e5]">
                          {assignment.title}
                        </span>
                        <span className="mt-1 block text-[10px] text-[#858585]">
                          {assignment.fileName}
                        </span>
                      </span>
                      {activeAssignmentId === assignment.id && (
                        <Check
                          size={15}
                          className="mt-1 shrink-0 text-[#75beff]"
                        />
                      )}
                    </button>
                  ))
                ) : (
                  <p className="px-4 py-8 text-center text-xs text-[#858585]">
                    No assignments match your search.
                  </p>
                )}
              </div>
              <div className="flex items-center justify-between border-t border-[#3c3c3c] px-4 py-2 text-[10px] text-[#858585]">
                <span>
                  {filteredAssignments.length} of {ASSIGNMENTS.length}{" "}
                  assignments
                </span>
                <span>
                  <kbd className="rounded border border-[#4a4a4a] bg-[#1e1e1e] px-1.5 py-0.5">
                    Enter
                  </kbd>{" "}
                  open <span className="mx-1">·</span>{" "}
                  <kbd className="rounded border border-[#4a4a4a] bg-[#1e1e1e] px-1.5 py-0.5">
                    Esc
                  </kbd>{" "}
                  close
                </span>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
