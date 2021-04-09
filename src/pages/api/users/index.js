export default (req, res) => {
  const { method } = req;

  /**
   * index List users
   * @returns {array}
   */
  const index = () => {
    res.status(200).send('Hello world');
  };

  switch (method) {
    case 'GET':
      index();
      break
    case 'POST':
      // handlePost()
      break
    default:
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}