"""
Program to find the shortest path from one node to another node.
Author: Ravi Kaipu
"""

class Graph:
	def __init__(self):
		self.nodes = []
		self.edges = {}
		self.distances = {}

	def add_node(self, value):
		self.nodes.append(value)

	def add_edge(self, from_node, to_node, distance):
		if(from_node in self.edges):
			self.edges[from_node].append(to_node)
		else:
			self.edges[from_node]=[to_node]

		if (to_node in self.edges):
			self.edges[to_node].append(from_node)
		else:
			self.edges[to_node] = [from_node]
		self.distances[(from_node, to_node)] = distance

	def find_all_paths(self, start, end, path=[]):
		path = path + [start]
		if start == end:
			return [path]
		if start not in self.edges:
			return []
		paths = []
		for node in self.edges[start]:
			if node not in path:
				newpaths = self.find_all_paths(node, end, path)
				for newpath in newpaths:
					paths.append(newpath)
		return paths

	def shortest_path(self,start,end):
		paths = self.find_all_paths(start,end)
		distances_list = {}
		for path in paths:
			total_distance = 0
			for node in range(len(path)-1):
				try:
					dist = self.distances[path[node],path[node+1]]
				except KeyError:
					dist = self.distances[path[node+1],path[node]]
				total_distance += dist
			distances_list[total_distance] = path
		print("Total paths from {} to {}: \n".format(start, end), distances_list)
		print("Shortest path: ", distances_list[min(distances_list)])

graph = Graph()
graph.add_node("A")
graph.add_node("B")
graph.add_node("C")
graph.add_node("D")
graph.add_node("E")
graph.add_node("F")
graph.add_edge("A","B",10)
graph.add_edge("A","C",20)
graph.add_edge("B","C",30)
graph.add_edge("B","D",10)
graph.add_edge("C","D",30)
graph.add_edge("E","F",100)
graph.add_edge("F","C",80)
graph.shortest_path("A","D")