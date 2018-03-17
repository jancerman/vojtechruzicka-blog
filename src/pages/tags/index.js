import React from "react";
import kebabCase from "lodash/kebabCase";
import Helmet from "react-helmet";
import Link from "gatsby-link";

const TagsPage = ({
                      data: { allMarkdownRemark: { group }, site: { siteMetadata: { title, description } } },
                  }) => (
    <div>
        <Helmet title={`Tags | ${title}`}>
            <meta name="description" content={description} />
        </Helmet>
        <div>
            <h1>Tags</h1>
            <ul>
                {group.sort((a, b) => {
                    //TODO do sorting in graphql
                    return b.totalCount - a.totalCount}
                    ).map(tag => (
                    <li key={tag.fieldValue}>
                        <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                            {tag.fieldValue} ({tag.totalCount})
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

export default TagsPage;

export const pageQuery = graphql`
  query TagsQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;