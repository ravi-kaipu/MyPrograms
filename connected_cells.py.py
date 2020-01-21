#-------------------------------------------------------------------------------
# Name:        WhatsAppBot
# Purpose:
#
# Author:      Ravi Kaipu
#
# Created:     21-12-2019
# Copyright:   (c) Ravi Kaipu, ravi.rgukt.in@gmail.com 2019
#-------------------------------------------------------------------------------
"""
Consider a matrix where each cell contains either a  or a . Any cell containing a  is called a filled cell. Two cells are said to be connected if they are adjacent to each other horizontally, vertically, or diagonally. In the following grid, all cells marked X are connected to the cell marked Y.

XXX
XYX  
XXX    
If one or more filled cells are also connected, they form a region. Note that each cell in a region is connected to zero or more cells in the region but is not necessarily directly connected to all the other cells in the region.

Given an  matrix, find and print the number of groups in the matrix and match them with given queries which contains the groups numbers.

For example, there are two regions in the following  matrix. The larger region at the top left contains  cells. The smaller one at the bottom right contains .

110
100
001


Input Format

matrix with cells Each of the next  lines contains  space-separated integers .
array of queries 


Constraints

Output Format

print the count of each group if it matches otherwise 0
Sample Input

1 1 0 0
0 1 1 0
0 0 1 0
1 0 0 0
[5, 1, 2]
Sample Output
[1, 1, 0]

Explanation

The diagram below depicts two regions of the matrix; for each region, the component cells forming the region are marked with an X:

X X 0 0     1 1 0 0
0 X X 0     0 1 1 0
0 0 X 0     0 0 1 0
1 0 0 0     X 0 0 0
The first region has five cells and the second region has one cell. We print the number of counts of 5 is 1 and 1 is 1, 2 is 0
"""


def left(grid, row, col):
    if col == 0:
        return False
    return True if (grid[row][col-1]) else False

def right(grid, row, col):
    if col == len(grid[row])-1:
        return False
    return True if (grid[row][col+1]) else False

def top(grid, row, col):
    if row == 0:
        return False
    return True if (grid[row-1][col]) else False

def bottom(grid, row, col):
    if row == len(grid)-1:
        return False
    return True if (grid[row+1][col]) else False

def group_element(grid, row, col, conn = []):
    l = left(grid, row, col)
    r = right(grid, row, col)
    t = top(grid, row, col)
    b = bottom(grid, row, col)
    if (row, col) not in conn:
        conn.append((row, col))
    if l and (row, col-1) not in conn:
        lm = group_element(grid, row, col-1, conn)
    if r and (row, col+1) not in conn:
        rm = group_element(grid, row, col+1, conn)
    if t and (row-1, col) not in conn:
        tm = group_element(grid, row-1, col, conn)
    if b and (row+1, col) not in conn:
        bm = group_element(grid, row+1, col, conn)
    return conn

def solution(grid, queries):
    rows, cols = len(grid), len(grid[0])
    final = []
    groups = []
    for row in range(rows):
        for col in range(cols):
            if grid[row][col] == 1 and (row, col) not in final:
                conn = []
                group = group_element(grid, row, col, conn)
                if group:
                    final += group
                    groups.append(group)

    values = list(map(lambda x: len(x), groups))

    dic = {}
    for value in values:
        if value not in dic:
            dic[value] = values.count(value)
    print(dic, queries)

    out = []
    for query in queries:
        value = 0
        if query in dic:
            value = dic[query]
        out.append(value)
    return out

if __name__ == '__main__':
    grid = [[1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 1]]

    queries = [1, 10, 20, 2]
    results = solution(grid, queries)
    print("Result ",results)