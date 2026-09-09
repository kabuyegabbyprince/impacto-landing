import React from 'react';
import { ShoppingBag, PhoneCall } from 'lucide-react';
import { Card, Badge, EmptyState } from '../ui';
import { Organization, MarketplaceProduct } from '../../types';

interface OrganizationMarketplaceProps {
  orgId: string;
  org: Organization;
  isPublic?: boolean;
}

const mockProducts: MarketplaceProduct[] = [
  {
    id: 'prod-1',
    org_id: 'org-2',
    title: 'Kinigi Select Seed Potatoes (50kg Bag)',
    description: 'Certified disease-free seed potatoes harvested from the high-altitude volcanic soils of Musanze.',
    price: 35000,
    currency: 'RWF',
    category: 'Agriculture',
    image_url: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&auto=format&fit=crop&q=80',
    available_stock: 120,
    contact_phone: '+250 788 654 321',
  },
  {
    id: 'prod-2',
    org_id: 'org-5',
    title: 'Handwoven Agaseke Peace Basket (Large)',
    description: 'Traditional Rwandan peace basket crafted from natural sisal and sweetgrass fibers by cooperative artisans.',
    price: 28000,
    currency: 'RWF',
    category: 'Handicrafts',
    image_url: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?w=600&auto=format&fit=crop&q=80',
    available_stock: 45,
    contact_phone: '+250 788 777 888',
  },
];

export const OrganizationMarketplace: React.FC<OrganizationMarketplaceProps> = ({
  orgId,
  org,
}) => {
  const products = mockProducts.filter((p) => p.org_id === orgId || orgId === 'org-2' || orgId === 'org-5');

  if (products.length === 0) {
    return (
      <EmptyState
        icon={<ShoppingBag className="h-8 w-8 text-slate-400" />}
        title="No Products in Catalog"
        message="This organization has not published any cooperative products yet."
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white">
            Cooperative Products & Harvests
          </h3>
          <p className="text-xs text-slate-500">
            Direct from {org.name} members in Rwanda.
          </p>
        </div>
        <Badge color="green">{products.length} Products Active</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((product) => (
          <Card key={product.id} padding={false} className="flex flex-col h-full">
            {product.image_url && (
              <div className="h-44 w-full bg-slate-100 overflow-hidden">
                <img
                  src={product.image_url}
                  alt={product.title}
                  className="h-full w-full object-cover hover:scale-105 transition-transform duration-200"
                />
              </div>
            )}
            <div className="p-5 flex flex-col flex-1 justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Badge color="blue">{product.category}</Badge>
                  <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    Stock: {product.available_stock}
                  </span>
                </div>
                <h4 className="font-bold font-display text-base text-slate-900 dark:text-white">
                  {product.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                  {product.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Unit Price</span>
                  <span className="text-base font-extrabold font-display text-slate-900 dark:text-white">
                    {product.price.toLocaleString()} {product.currency}
                  </span>
                </div>

                <a
                  href={`tel:${product.contact_phone || org.donation_mtn_number || '+250788123456'}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs transition"
                >
                  <PhoneCall className="h-3.5 w-3.5" />
                  <span>Order Direct</span>
                </a>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
