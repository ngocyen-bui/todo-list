// A mock function to mimic making an async request for data

export function createData(data) {
  return new Promise((resolve) =>
    resolve({ data: data })
  );
}
export function deleteData(data) {
  return new Promise((resolve) =>
    resolve({ data: data })
  );
}
