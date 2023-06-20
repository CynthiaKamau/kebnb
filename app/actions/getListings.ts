export default async function getListings() {
  try {
    const lisitngs = await prisma?.listing.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
    return lisitngs;
  } catch (error: any) {
    throw new Error(error)
  }
}