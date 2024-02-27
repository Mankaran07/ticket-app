import TicketCard from "./(components)/TicketCard";

const getTickets = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/Tickets", {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }
    return res.json();
  } catch (error) {
    console.error("Failed to get tickets", error);
  }
};

const Dashboard = async () => {
  const data = await getTickets();
  if (data?.tickets.length === 0) {
    return (
      <p className="text-5xl flex justify-center text-red-600">No Tickets</p>
    );
  }
  const tickets = data.tickets;
  const uniqueCategories = [
    ...new Set(tickets?.map(({ category }) => category)),
  ];

  return (
    <div className="p-4">
      <div>
        {tickets &&
          uniqueCategories?.map((uniqueCategory, categoryIndex) => (
            <div className="mb-4" key={categoryIndex}>
              <h2>{uniqueCategory}</h2>
              <div className="my-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {tickets
                  .filter((ticket) => ticket.category === uniqueCategory)
                  .map((filterTicket, _index) => (
                    <TicketCard
                      id={_index}
                      key={_index}
                      ticket={filterTicket}
                    />
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
