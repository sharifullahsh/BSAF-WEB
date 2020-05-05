import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { BeneficiaryForSearch } from 'src/app/models/BeneficiaryForSearch';

// TODO: Replace this with your own data model type
export interface BeneficiarySearchItem {
  name: string;
  id: number;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: BeneficiaryForSearch[] = [
  {cardID: "1"},
];

/**
 * Data source for the BeneficiarySearch view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class BeneficiarySearchDataSource extends DataSource<BeneficiaryForSearch> {
  data: BeneficiaryForSearch[] = EXAMPLE_DATA;
  paginator: MatPaginator;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<BeneficiaryForSearch[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData([...this.data]);
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: BeneficiaryForSearch[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

}

