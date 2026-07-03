import inspect
import cognee

print(inspect.signature(cognee.get_memory_provenance_graph))
print(cognee.get_memory_provenance_graph.__doc__)