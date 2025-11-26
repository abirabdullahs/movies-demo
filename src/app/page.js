import Link from "next/link";

export default function Home() {
  const featured = [
    { id: 1, title: "Wireless Headphones", short: "Comfortable wireless headphones", price: "$89", image: "https://i0.wp.com/gadgetoo.com.bd/wp-content/uploads/2025/07/ACEFAST-H9-Active-Noise-Cancelling-Headphone-3.webp?resize=600%2C600&ssl=1" },
    { id: 2, title: "Smartwatch Pro", short: "Track fitness & notifications", price: "$129", image: "https://images-cdn.ubuy.co.in/653dca4638b3b6351c03b03e-smart-watch-for-android-and-iphone.jpg" },
    { id: 3, title: "Mini Projector", short: "Portable 1080p mini projector", price: "$199", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfNJXmDN3_En0oEnhuhEWp2tfFvYsaA814cA&s" },
    { id: 4, title: "Noise-Cancelling Earbuds", short: "Tiny buds, huge sound", price: "$59", image: "https://static-01.daraz.com.bd/p/85c0ba0398921788c9d796e3cf3cb48b.png" },
    { id: 5, title: "USB-C Hub", short: "Expand your laptop ports", price: "$39", image: "https://www.penguin.com.bd/wp-content/uploads/2025/01/ugreen-revodok-usb-c-hub-5-in-1-300x300.webp" },
    { id: 6, title: "Ergonomic Keyboard", short: "Comfortable mechanical keyboard", price: "$79", image: "https://www.goldtouch.com/wp-content/uploads/2020/11/ergonomic-keyboard-hero.jpg" },
  ];

  return (
    <main className="max-w-7xl mx-auto p-6">
      {/* HERO */}
      <section className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 py-12">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">Discover quality products — made simple</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-xl">ShopDemo is a minimal product catalog showcasing protected routes, social login and a clean responsive UI. Browse, add and manage products with a pleasant experience.</p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link href="/products" className="btn btn-primary px-6">Browse Products</Link>
            <Link href="/add-product" className="btn btn-outline px-6">Add Product</Link>
          </div>

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl">🚚</div>
              <p className="font-semibold">Fast shipping</p>
            </div>
            <div className="text-center">
              <div className="text-3xl">🔒</div>
              <p className="font-semibold">Secure</p>
            </div>
            <div className="text-center">
              <div className="text-3xl">⭐</div>
              <p className="font-semibold">Top rated</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg overflow-hidden shadow-lg bg-linear-to-tr from-yellow-50 to-white mb-8">
          <img src="https://webandcrafts.com/_next/image?url=https%3A%2F%2Fadmin.wac.co%2Fuploads%2FWhat_is_E_commerce_and_What_are_its_Applications_2_d2eb0d4402.jpg&w=4500&q=90" alt="hero" className="w-full h-80 object-cover" />
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-10">
        <h2 className="text-2xl font-bold mb-6">Why ShopDemo</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <article className="p-6 bg-white rounded-md shadow-sm hover:shadow-lg hover:-translate-y-1 transform transition">
            <h3 className="font-semibold">Curated Selection</h3>
            <p className="text-sm text-gray-600 mt-2">Hand-picked items with clear descriptions to help you decide fast.</p>
          </article>
          <article className="p-6 bg-white rounded-md shadow-sm hover:shadow-lg hover:-translate-y-1 transform transition">
            <h3 className="font-semibold">Secure Authentication</h3>
            <p className="text-sm text-gray-600 mt-2">NextAuth provides secure sign-in flows including Google and credentials.</p>
          </article>
          <article className="p-6 bg-white rounded-md shadow-sm hover:shadow-lg hover:-translate-y-1 transform transition">
            <h3 className="font-semibold">Mobile Friendly</h3>
            <p className="text-sm text-gray-600 mt-2">Responsive layouts and consistent spacing for the best experience on any device.</p>
          </article>
        </div>
      </section>

      {/* FEATURED ITEMS */}
      <section className="py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Featured Products</h2>
            <p className="text-sm text-gray-600">Hand-picked items you might love.</p>
          </div>
          <Link href="/products" className="text-sm link">See all products</Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((p) => (
            <article key={p.id} className="bg-white rounded-md overflow-hidden shadow-sm hover:shadow-lg transition-transform transform hover:-translate-y-1">
              <figure className="h-44 bg-gray-100">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
              </figure>
              <div className="p-4">
                <h3 className="font-semibold text-lg">{p.title}</h3>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">{p.short}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-semibold">{p.price}</span>
                  <Link href={`/products/${p.id}`} className="btn btn-sm btn-primary">Details</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-10">
        <h2 className="text-2xl font-bold mb-6">Customer Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <blockquote className="p-6 bg-white rounded-md shadow-sm">
            <p className="text-gray-700">“Great selection and smooth checkout — highly recommend.”</p>
            <cite className="block mt-4 font-semibold">— Alex P.</cite>
          </blockquote>
          <blockquote className="p-6 bg-white rounded-md shadow-sm">
            <p className="text-gray-700">“The protected pages and Google login made onboarding effortless.”</p>
            <cite className="block mt-4 font-semibold">— Maria K.</cite>
          </blockquote>
          <blockquote className="p-6 bg-white rounded-md shadow-sm">
            <p className="text-gray-700">“Clean UI and responsive design — works great on mobile.”</p>
            <cite className="block mt-4 font-semibold">— Sam L.</cite>
          </blockquote>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-12 mt-8 rounded-md bg-gradient-to-r from-primary/10 to-white p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold">Ready to add your own product?</h3>
          <p className="text-sm text-gray-600">Sign in and publish a listing in seconds — manage everything from your dashboard.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/add-product" className="btn btn-primary">Add Product</Link>
          <Link href="/manage-products" className="btn btn-ghost">Manage</Link>
        </div>
      </section>
    </main>
  );
}
