import React, { Component } from 'react';

export class Footer extends Component {

  render() {
      return (
        <footer className="text-body-secondary py-5">
            <div className="container">
                <p className="float-end mb-1">
                    <a href="#">Back to top</a>
                </p>
                <p>The Jean Edwards Consulting - Movie Search Assessment is a single-page application (SPA), built with:</p>
                <ul>
                    <li><a href='https://get.asp.net/'>ASP.NET Core v7.0</a> and <a href='https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx'>C#</a> for cross-platform server-side code</li>
                    <li><a href='https://facebook.github.io/react/'>React</a> for client-side code</li>
                    <li><a href='http://getbootstrap.com/'>Bootstrap</a> for layout and styling</li>
                </ul>
                <p>The <code>Source Code</code> is available at: <a href='https://facebook.github.io/react/'>React</a>.</p>
            </div>
        </footer>
    );
  }
}
